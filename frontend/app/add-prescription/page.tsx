"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Upload, Check, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

function cleanGeminiResponse(response) {
  // Regular expression to match the JSON format
  const jsonPattern = /```json\s*\{[^]*\}\s*```/g;

  // Check if the response contains the JSON block
  if (jsonPattern.test(response)) {
      // Extract the content between the brackets
      const matches = response.match(/\{([^]*?)\}/);
      // console.log("In cleaned Res: matches" , matches);
      // console.log("In cleaned Res: matches[1]", matches[0]);
      if (matches && matches[0]) {
          // Parse the JSON string and return the medicines array
          // const jsonResponse = JSON.parse(matches[0]);
          return matches[0]; // Return an empty array if medicines are not found
      }
      return {
        "medicines": null
      }
  }
  else{
    return response;
  }
}


export default function AddPrescription() {
  const [photo, setPhoto] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [medicines, setMedicines] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)


    // Converts File object to Base64
    const fileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!photo) {
      setError("Ye need to provide a prescription scroll, matey!")
      return
    }

    setIsLoading(true)
    setError(null)

    // Simulating image processing delay
    // await new Promise((resolve) => setTimeout(resolve, 2000))


    // // Mock medicines (replace with actual image processing logic)
    // setMedicines(["Pirate's Pain Potion", "Sea Sickness Syrup", "Scurvy Stopper"])
    // setIsLoading(false)

    try {
      const base64Image = await fileToBase64(photo);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const prompt = `
      You are an advanced AI model specializing in medical 
            text extraction. Your task is to analyze a given image 
            and determine whether it is a valid medical prescription. 
            If the image contains a prescription, extract only the 
            names of the medicines mentioned in the document and 
            return them in a structured format as follows:
            
            {
              "medicines": ["Medicine1", "Medicine2", "Medicine3"]
            }

            If the image does not contain a prescription or if you 
            are unable to identify any medicine names, return the 
            following response:

            {
              "medicines": null
            }

            Do not include any additional text, dosage instructions, 
            or doctor/patient details—only extract the medicine names. 
            Maintain accuracy by ensuring that only valid medicine names 
            are included. If the document contains unrelated text, 
            receipts, or any other type of document, classify it as 
            non-prescription and return null. Don't write '''json ''' or anything like that.
      `


      const imageParts = [
        {
          inlineData: {
            data: base64Image.split(",")[1], // Remove the `data:image/jpeg;base64,` prefix
            mimeType: photo.type,
          },
        },
      ];

      const generatedContent = await model.generateContent([prompt, ...imageParts]);
      const responseText = generatedContent.response.text();
      // console.log("Response Text : " , responseText);
      const cleanedResponse = cleanGeminiResponse(responseText);
      // console.log("Cleaned Response : " , cleanedResponse);
      console.log(JSON.parse(cleanedResponse));

      // Assuming responseText contains a JSON array like '["Medicine A", "Medicine B"]'
      setMedicines(JSON.parse(cleanedResponse)['medicines']);
    } catch (err) {
      console.error("Error processing image:", err);
      setError("Arrr! Somethin' went wrong while decoding the scroll.");
    }

    setIsLoading(false);
  
  }

  return (
    <div className="min-h-screen bg-parchment py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-brown mb-8 pirate-font text-center">Add Yer Prescription</h1>

        <div className="bg-parchment-light p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-brown mb-4 pirate-font">Upload Yer Scroll</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-brown border-dashed rounded-lg cursor-pointer bg-parchment hover:bg-parchment-light"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-brown" />
                  <p className="mb-2 text-sm text-brown">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-brown-dark">PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
                  accept="image/*"
                />
              </label>
            </div>
            {photo && <p className="text-brown">Selected file: {photo.name}</p>}
            <Button type="submit" className="w-full btn-pirate" disabled={isLoading}>
              {isLoading ? "Decoding the scroll..." : "Process Prescription"}
            </Button>
          </form>
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <AlertTriangle className="inline mr-2" />
              {error}
            </div>
          )}
        </div>

        {isLoading && (
          <div className="text-center">
            <Image src="/spinning-compass.gif" alt="Loading" width={64} height={64} className="mx-auto" />
            <p className="text-brown mt-2">Decoding the prescription scroll...</p>
          </div>
        )}

        {medicines.length > 0 && (
          <div className="bg-brown-dark p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-parchment mb-4 pirate-font">Treasure Chest of Medicines</h3>
            <ul className="space-y-2">
              {medicines.map((medicine, index) => (
                <li key={index} className="flex items-center text-parchment">
                  <Check className="mr-2 text-green-400" />
                  {medicine}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 bg-parchment-light p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-brown mb-4 pirate-font">How It Works</h2>
          <div className="space-y-4">
            <p className="text-brown-dark">
              Our AI-powered parrot uses advanced image recognition to decipher even the most cryptic of prescription
              scrolls. Here's how:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-brown-dark">
              <li>Upload yer prescription scroll (image) to our secure treasure chest.</li>
              <li>Our trained parrot examines the scroll, looking for important markings and symbols.</li>
              <li>The parrot translates the doctor's scrawl into readable text.</li>
              <li>We present ye with a list of identified medicines and instructions.</li>
            </ol>
            <p className="text-brown-dark">
              Remember, while our parrot is quite clever, always consult with yer ship's doctor or local apothecary to
              confirm the findings!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

