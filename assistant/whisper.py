import sounddevice as sd
import torch
from transformers import pipeline
import warnings
from langdetect import detect_langs
from localized_object_extractor import extract_object
from utils import speak
from constants import STRINGS

warnings.filterwarnings("ignore", category=FutureWarning)
whisper = pipeline("automatic-speech-recognition", model="openai/whisper-medium", torch_dtype=torch.float32, device="cpu", use_fast=True)
sample_rate = 16000
RECORD_DURATION = 5

def record_audio(record_duration):
    print("Recording... Please speak.")
    audio = sd.rec(int(record_duration * sample_rate), samplerate=sample_rate, device =1, channels=1, dtype="float32")
    sd.wait()
    print("Recording complete.")
    return audio.flatten()

def transcribe_audio(audio_data):
    print("Transcribing audio...")
    # transcription = whisper({"array": audio_data, "sampling_rate": sample_rate, "language": "en"})
    transcription = whisper({"array": audio_data, "sampling_rate": sample_rate})
    transcribed_text = transcription["text"]
    print("Transcribed text:", transcribed_text)
    try:
        lang = detect_langs(transcribed_text)[0].lang
        print("Detected language as", lang)
    except Exception as err:
        lang = "en"
        print("Error while detecting language", err)
    return extract_object(transcribed_text, lang, STRINGS)

def get_target_object():
    #* TEST
    # return LocalizedData("en", "medicine", CLASSES, STRINGS)

    audio_data = record_audio(RECORD_DURATION)
    speak(STRINGS['wait_while_load'])
    loc_data = transcribe_audio(audio_data)
    return loc_data