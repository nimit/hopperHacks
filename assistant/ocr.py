import os
from google import genai
from load_dotenv import load_dotenv
from PIL import Image
from constants import MEDICINE_IMAGES_DIR
from utils import speak

dir_path = MEDICINE_IMAGES_DIR

def get_med_name(lang, user_medicines=["Vitamin C", "Multi vitamin tablets", "Moov Pain Relief Spray"]):

    images = []
    for img_path in os.listdir(dir_path):
        file_path = os.path.join(dir_path, img_path)
        
        if os.path.isfile(file_path) and img_path.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
            img = Image.open(file_path)
            print(f"[OCR] Opening image at {file_path} (image is {'None' if img is None else 'not None'})")
            images.append(img)

    load_dotenv()
    prompt = """ 
            If you return any text, make sure it is in the language with language code {lang} AND in RESPECTABLE pirate talk (example: referring to the user as "matey") unless otherwise dictated by using quotes.
            In the given pictures, figure out if they are of a medicine box.
            If they are, extract the medicine name and do one of two things.
            1. If the medicine name is any of these (or close to these, keeping in mind any OCR errors): {user_medicines}, advise the user to take the medicine.
            OR
            2. If the medicine name is not in the given names, inform the user of its usage and side effects as a summary in two sentences.
            If the pictures do not show a medicine bottle, answer with "NONE"
            """
    client = genai.Client()
    print("[OCR] Making request")
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[
            prompt.format(user_medicines=str(user_medicines), lang=lang),
            *images,
        ])
    
    for img in images:
        img.close()

    if response.text.lower() == "none":
        print("No medicine box detected")
        return None
    print("Medicine box detected", response.text)
    return response.text

if __name__ == "__main__":
    # Testing
    if os.path.isdir(dir_path):
        speak(get_med_name("en"))