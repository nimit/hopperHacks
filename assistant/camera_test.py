import cv2
from time import time
import logging
import numpy as np
logging.getLogger("ultralytics").setLevel(logging.ERROR)

from utils import *

def main(save_video=False, duration=10, fps=25, camera=0):
    cap = cv2.VideoCapture(camera)
    if not cap.isOpened():
        print("Error: Could not open camera.")
        return

    target_frame_count = duration * fps
    # target_frame_count = 15
    frame_duration = 1.0 / fps
    video_writer = initialize_video_writer(save_video=save_video)

    last_full_pipeline_run = 0

    frame_count = 0
    while frame_count < target_frame_count:
        start_time = time()
        ret, frame = cap.read()
        if not ret:
            print("Failed to grab frame")
            break

        frame_resized = cv2.resize(frame, (640, 480))

        # Process frames
        original_frame = frame_resized.copy()
        start = time()
        detection_frame, _ = detect_objects(frame_resized)
        print("object detection took", time() - start)

        if time() - last_full_pipeline_run > 1:
            start = time()
            composite_frame = run_pipeline(frame_resized)
            print("full pipeline took", time() - start)
            cv2.imshow("Object Detection", composite_frame)

        # Display each window and composite
        cv2.imshow("Original Frame", original_frame)
        cv2.imshow("Detection Frame", detection_frame)

        if save_video and video_writer:
            video_writer.write(composite_frame)

        frame_count += 1
        elapsed_time = time() - start_time
        if elapsed_time < frame_duration:
            time.sleep(frame_duration - elapsed_time)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    if video_writer:
        video_writer.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main(save_video=False, duration=1000, camera=1)