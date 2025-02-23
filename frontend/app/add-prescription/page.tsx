"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Upload, Check, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AddPrescription() {
  const [photo, setPhoto] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [medicines, setMedicines] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!photo) {
      setError("Ye need to provide a prescription scroll, matey!")
      return
    }

    setIsLoading(true)
    setError(null)

    // Simulating image processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock medicines (replace with actual image processing logic)
    setMedicines(["Pirate's Pain Potion", "Sea Sickness Syrup", "Scurvy Stopper"])
    setIsLoading(false)
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

