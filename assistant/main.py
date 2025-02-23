import time
import cv2
import numpy as np
import sys
from utils import *
from whisper import get_target_object
from path_finder import next_instruction
import time
from constants import *
import warnings
from ocr import get_med_name

warnings.filterwarnings("ignore", category=FutureWarning)

def start_find():
    depth_colored = None
    medicine_bottle_recorder = None
    speak(STRINGS["introduction"])
    loc_data= get_target_object()
    speaker = LocalizedSpeaker(loc_data)
    if loc_data and loc_data.object:
        loc_data.instructions = {**loc_data.instructions, **PIRATE_STRINGS_EN}
        print("Object to detect:", loc_data.object)
        if loc_data.object == "medicine":
            loc_data.object = "bottle"
            medicine_bottle_recorder = MedicineBottleRecorder()
    else:
        print("No object found in the transcription.")
        speaker.speak("transcript_error")
        exit(1)
    target_obj = loc_data.object
    print("User language is", loc_data.lang)
    speaker.speak("transcript_success")
    
    AREA_THRESHOLD = 2.25
    DEPTH_THRESHOLD = 30
    TIME_SPEAK_INTERVAL = 0.75

    DEPTH_ADJUST_COUNTER = 1

    cap = cv2.VideoCapture(1)
    if not cap.isOpened():
        print("Error: Could not open video.")
        exit()

    initial_depth = {}
    initial_area = {}
    interval_time = 0
    last_read = time.time()
    last_depth = sys.maxsize
    while True:
        data = []
        start_time = time.time()
        # if start_time - last_read < FRAMES_PER_SECOND:
        #     time.sleep(FRAMES_PER_SECOND - start_time + last_read)
        ret, frame = cap.read()
        # last_read = time.time()
        if not ret:
            print("Error: Could not read frame.")
            break
        if DEPTH_ADJUST_COUNTER < 1:
        #     speak(f"The {target_obj} has been found!")
            DEPTH_ADJUST_COUNTER = 1

        frame = cv2.resize(frame, (640, 480))
        combined_mask = np.zeros_like(frame)

        objects = run_object_detection(frame)
        print("ALL OBJECTS", objects)

        target_mask = get_object_mask(frame, prompt=target_obj)
        target_contours, _ = cv2.findContours(target_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        if target_contours:
            largest_contour = max(target_contours, key=cv2.contourArea)
            x, y, w, h = cv2.boundingRect(largest_contour)
            area = cv2.contourArea(largest_contour)

            depth_array = run_depth_estimation(frame)
            print("Depth array shape:", depth_array.shape)

            target_depth_values = depth_array[y:y+h, x:x+w]
            average_depth = np.mean(target_depth_values)
            if last_depth < average_depth and average_depth - last_depth > 10:
                print("Moved away from target. Maybe locked onto another")
                continue

            depth_colored = cv2.applyColorMap(cv2.normalize(depth_array, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8), cv2.COLORMAP_MAGMA)
            box_color = (255, 255, 255)
            cv2.rectangle(depth_colored, (x, y), (x + w, y + h), box_color, 2)
            cv2.putText(depth_colored, f"{target_obj}: Avg Depth {average_depth:.2f}", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, box_color, 1)

            target_overlay = np.zeros_like(frame)
            target_overlay[target_mask == 255] = box_color
            combined_mask = cv2.addWeighted(combined_mask, 1, target_overlay, 1, 0)

            data.append((target_obj, x, y, x+w, y+h, average_depth))
        else:
            speaker.speak("object_not_found")
            time.sleep(1.5)
            continue

        obstacles = list(filter(lambda x: x != target_obj, objects))
        print("OBSTACLES", obstacles)

        for obstacle_obj in obstacles:
            obstacle_mask = get_object_mask(frame, prompt=obstacle_obj)
            obstacle_contours, _ = cv2.findContours(obstacle_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

            if obstacle_contours:
                largest_obstacle_contour = max(obstacle_contours, key=cv2.contourArea)
                x, y, w, h = cv2.boundingRect(largest_obstacle_contour)
                obstacle_depth_values = depth_array[y:y+h, x:x+w]
                obstacle_average_depth = np.mean(obstacle_depth_values)

                obstacle_color = (0, 0, 0)
                cv2.rectangle(depth_colored, (x, y), (x + w, y + h), obstacle_color, 2)
                cv2.putText(depth_colored, f"{obstacle_obj}: Avg Depth {obstacle_average_depth:.2f}", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, obstacle_color, 1)
                obstacle_overlay = np.zeros_like(frame)
                obstacle_overlay[obstacle_mask == 255] = obstacle_color
                combined_mask = cv2.addWeighted(combined_mask, 1, obstacle_overlay, 1, 0)
                data.append((obstacle_obj, x , y, x+w , y+h , average_depth))

        if depth_colored is not None:
            seg_frame = run_semantic_segmentation(frame, prompt="ground", overlay_original=True)
            overlay = cv2.addWeighted(frame, 0.6, combined_mask, 0.4, 0)
            top_row = np.hstack((frame, seg_frame))
            bottom_row = np.hstack((depth_colored, overlay))
            combined_display = np.vstack((top_row, bottom_row))
            cv2.imshow('Combined Display', combined_display)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

        move, location, bool_et = next_instruction(data, loc_data)

        if target_obj not in initial_depth:
            initial_depth[target_obj] = average_depth
            initial_area[target_obj] = area
        else:
            if area >= AREA_THRESHOLD * initial_area[target_obj] and average_depth >= initial_depth[target_obj] + DEPTH_THRESHOLD and location=="middle of screen":
                speaker.speak("reached_object")
                print(f"At the {target_obj}.")
                break
        
        interval_time += time.time() - start_time
        start_time = time.time()

        if(interval_time > TIME_SPEAK_INTERVAL):
            speak(move, loc_data.lang)
            time.sleep(0.5)
            if (bool_et): time.sleep(0.5)
            interval_time = 0

    if medicine_bottle_recorder:
        time.sleep(1)
        speaker.speak("pick_up_medicine_bottle")
        time.sleep(1)
        medicine_bottle_recorder.found_bottle = True
        while medicine_bottle_recorder.index < 3:
            _, frame = cap.read()
            medicine_bottle_recorder.save_next(frame)
            speaker.speak("rotate_bottle_in_hands")
            time.sleep(1)
        med_indent = get_med_name(loc_data.lang)
        speak(med_indent)

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    try:
        while True:
            x = input("Start?")
            if x == '0' or (len(x) > 0 and x[0] == 'n'):
                break
            start_find()

    except Exception as err:
        print("Exception occurred in the app:", err)
        raise err
    finally:
        if os.path.exists(AUDIO_PATH):
            os.remove(AUDIO_PATH)
        for img_path in os.listdir(MEDICINE_IMAGES_DIR):
            os.remove(f'{MEDICINE_IMAGES_DIR}{img_path}')
