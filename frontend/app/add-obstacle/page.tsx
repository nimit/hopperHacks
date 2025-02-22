"use client"

import type React from "react"

import { useState } from "react"

export default function AddObstacle() {
  const [email, setEmail] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("Active")
  const [photo, setPhoto] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Obstacle added:", { email, description, status, photo })
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/pirate-map-bg.jpg')" }}
    >
      <div className="bg-wood p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-amber-900 mb-6 pirate-font">Add Obstacle</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-parchment text-amber-900 placeholder-amber-700"
            required
          />
          <textarea
            placeholder="Obstacle description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-parchment text-amber-900 placeholder-amber-700"
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 rounded bg-parchment text-amber-900"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
            className="w-full p-2 rounded bg-parchment text-amber-900"
          />
          <button type="submit" className="w-full btn-pirate">
            Add Obstacle
          </button>
        </form>
      </div>
    </div>
  )
}

