"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

export default function TreasureMap() {
  const [obstacles, setObstacles] = useState([
    { id: 1, x: 20, y: 30, description: "Dangerous reef" },
    { id: 2, x: 60, y: 70, description: "Pirate ambush spot" },
    { id: 3, x: 40, y: 50, description: "Whirlpool" },
  ])

  const [selectedObstacle, setSelectedObstacle] = useState(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-amber-900 mb-8 pirate-font text-center">Treasure Map</h1>
      <div className="bg-wood p-4 rounded-lg shadow-lg relative" style={{ height: "600px" }}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/old-map.jpg')" }}
        ></div>
        {obstacles.map((obstacle) => (
          <div
            key={obstacle.id}
            className="absolute"
            style={{ left: `${obstacle.x}%`, top: `${obstacle.y}%` }}
            onMouseEnter={() => setSelectedObstacle(obstacle)}
            onMouseLeave={() => setSelectedObstacle(null)}
          >
            <MapPin className="text-red-600" size={24} />
          </div>
        ))}
        {selectedObstacle && (
          <div
            className="absolute bg-parchment p-2 rounded shadow-lg"
            style={{ left: `${selectedObstacle.x}%`, top: `${selectedObstacle.y + 5}%` }}
          >
            <p className="text-amber-900">{selectedObstacle.description}</p>
          </div>
        )}
      </div>
      <div className="mt-8 text-center">
        <p className="text-amber-800 text-lg">Hover over the map pins to reveal obstacle details, ye curious sailor!</p>
      </div>
    </div>
  )
}

