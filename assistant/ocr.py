import os
import google.generativeai as genai
from load_dotenv import load_dotenv
from PIL import Image
from constants import MEDICINE_IMAGES_DIR

dir_path = MEDICINE_IMAGES_DIR

def get_med_name(user_medicines=["Vitamin C", "Multi vitamins"]):

    images = []
    for img_path in os.listdir(dir_path):
        file_path = os.path.join(dir_path, img_path)
        
        if os.path.isfile(file_path) and img_path.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
            with Image.open(file_path) as img:
                images.append(img)

    load_dotenv()
    prompt = """ 
            If you return any text, make sure it is in RESPECTABLE pirate talk (example: referring to the user as "matey") unless otherwise dictated by using quotes.
            In the given pictures, figure out if they are of a medicine box.
            If they are, extract the medicine name and do one of two things.
            1. If the medicine name is any of these (or close to these, keeping in mind any OCR errors): {user_medicines}, advise the user to take the medicine.
            OR
            2. If the medicine name is not in the given names, inform the user of its usage and side effects as a summary in two sentences.
            If the pictures do not show a medicine bottle, answer with "NONE"
            """
    client = genai.Client()
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[
            prompt.format(medicine=str(user_medicines)),
            *images,
        ])

    if response.text.lower() == "none":
        print("No medicine box detected")
        return None
    print("Medicine box detected", response.text)
    return response.text

if __name__ == "__main__":
    # Testing
    if os.path.isdir(dir_path):
        get_med_name()