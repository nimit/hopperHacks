import sys
import json
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from load_dotenv import load_dotenv

class LocalizedData:
  object: str
  translated_classes: list[str]
  instructions: list[str]

  def __init__(self, lang, object, translated_classes, instructions):
    self.lang = lang
    self.object = object
    self.locale_object = translated_classes[object] if object in translated_classes else object
    self.translated_classes = translated_classes
    self.instructions = instructions
  
  def get(self, key, obstacle=None):
    object = obstacle if obstacle else (self.locale_object if self.locale_object else "")
    return self.instructions.get(key, "Localization Error").replace("{{object}}", object)

def extract_object(input_text, language, instructions):
  load_dotenv()
  sys.stdout.reconfigure(encoding='utf-8')

  # Initialize the model
  llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash")

  # Create a prompt template
  prompt_template = PromptTemplate.from_template("""You are an intelligent chatbot that processes user input to identify objects from a predefined list of objects, translate text, and return a structured JSON output. Follow these steps precisely:

  Translate {input} in english and determine if it contains any object or its synonym that is mentioned in the following list:
  [person, bicycle, car, motorcycle, airplane, bus, train, truck, boat, traffic light, fire hydrant, stop sign, parking meter, bench, bird, cat, dog, horse, sheep, cow, elephant, bear, zebra, giraffe, backpack, umbrella, handbag, tie, suitcase, frisbee, skis, snowboard, sports ball, kite, baseball bat, baseball glove, skateboard, surfboard, tennis racket, bottle, wine glass, cup, fork, knife, spoon, bowl, banana, apple, sandwich, orange, brocolli, carrot, hot dog, pizza, donut, cake, chair, couch, potted plant, bed, dining table, toilet, tv, laptop, mouse, remote, keyboard, cell phone, microwave, oven, toaster, sink, refrigerator, book, clock, vase, scissors, teddy bear, hair drier, toothbrush]
  If an object is found, return its English name from the list. Otherwise, return none.
  Translate the entire list of 80 objects into the {language} language.
  Translate instructions: {instructions} into the {language} language.
  Format the response as JSON with the following structure:
  {{
    "identified_object": "<object_in_english_or_none>",
    "translated_objects": {{
      "person": "<translated_word>",
      "bicycle": "<translated_word>",
      ...
    }},
    "instructions": "<translated_instructions>"
  }}
  If no object is found, set "identified_object": "none" and "translated_objects": null, but still translate the instructions.

  Ensure accuracy in translations and maintain JSON structure integrity.

  Additionally, Take care when translating the instructions, look for double curly braces {{}} in the instructions and consider the text between them as a variable so translate it accordingly so that it makes sense if I replace the variable in the translation.""")

  prompt = prompt_template.format(input=input_text, language=language, instructions=instructions)

  # Invoke the model with the prepared prompt
  response = llm.invoke(prompt)

  json_string = response.content
  json_string = json_string[8:] if json_string.startswith("```json") else json_string 
  json_string = json_string[:-3] if json_string.endswith("```") else json_string
  data = json.loads(json_string.strip())
  object = data['identified_object']
  translated_classes = data['translated_objects'] if data['translated_objects'] else {}
  instructions = data['instructions']

  return LocalizedData(language, object if object != "none" else None, translated_classes, instructions)

if __name__ == "__main__":
  #? Test this GenAI pipeline
  input_text = "मैं अपनी बोतल ढूंढना चाहता हूँ"
  language = "hi" #* hindi language tag
  instructions = {
    "move_left": "Turn left.",
    "move_right": "Turn right.",
    "move_obstructed": "There is a {{object}} in front of you, turn left",
  }
  loc_data = extract_object(input_text, language, instructions)
  print(loc_data.object)
  print(len(loc_data.translated_classes))
  print(loc_data.instructions)
