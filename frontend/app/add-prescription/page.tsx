"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

export default function AddPrescription() {
  const [photo, setPhoto] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [medicines, setMedicines] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!photo) return

    setIsLoading(true)
    // Simulating image processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Mock medicines (replace with actual image processing logic)
    setMedicines(["Medicine A", "Medicine B", "Medicine C"])
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/pirate-apothecary-bg.jpg')" }}
    >
      <div className="bg-wood p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-amber-900 mb-6 pirate-font">Add Prescription</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
            className="w-full p-2 rounded bg-parchment text-amber-900"
            required
          />
          <button type="submit" className="w-full btn-pirate" disabled={isLoading}>
            {isLoading ? "Processing..." : "Upload Prescription"}
          </button>
        </form>
        {isLoading && (
          <div className="mt-4 text-center">
            <Image src="/spinning-compass.gif" alt="Loading" width={64} height={64} className="mx-auto" />
            <p className="text-amber-900">Decoding the prescription scroll...</p>
          </div>
        )}
        {medicines.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-bold text-amber-900 mb-2">Medicines Found:</h3>
            <ul className="list-disc list-inside text-amber-900">
              {medicines.map((medicine, index) => (
                <li key={index}>{medicine}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

