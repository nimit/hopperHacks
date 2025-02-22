import Link from "next/link"
import { Compass, Map, Pill } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/pirate-map-bg.jpg')" }}>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-amber-900 mb-8 pirate-font">SpotiFind Rx</h1>
          <p className="text-2xl text-amber-800 mb-12">
            Ahoy! Set sail to find and log obstacles or prescriptions, matey!
          </p>
          <div className="flex justify-center">
            <Link href="/auth" className="btn-pirate">
              Join the Crew
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-wood p-6 rounded-lg shadow-lg text-center">
            <Compass className="mx-auto mb-4 text-amber-600" size={48} />
            <h2 className="text-2xl font-bold text-amber-900 mb-2 pirate-font">Navigate Health</h2>
            <p className="text-amber-800">
              Chart your course through the treacherous seas of health with our pirate-themed guidance.
            </p>
          </div>
          <div className="bg-wood p-6 rounded-lg shadow-lg text-center">
            <Map className="mx-auto mb-4 text-amber-600" size={48} />
            <h2 className="text-2xl font-bold text-amber-900 mb-2 pirate-font">Treasure Map</h2>
            <p className="text-amber-800">
              Discover and report obstacles on our interactive map to help fellow buccaneers.
            </p>
          </div>
          <div className="bg-wood p-6 rounded-lg shadow-lg text-center">
            <Pill className="mx-auto mb-4 text-amber-600" size={48} />
            <h2 className="text-2xl font-bold text-amber-900 mb-2 pirate-font">Prescription Plunder</h2>
            <p className="text-amber-800">
              Unlock the secrets of your prescriptions with our AI-powered decoding system.
            </p>
          </div>
        </div>

        <div className="bg-wood p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-amber-900 mb-4 pirate-font">Latest Treasure Updates</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-parchment p-4 rounded-lg">
              <h3 className="text-xl font-bold text-amber-900 mb-2">New Obstacle Reported</h3>
              <p className="text-amber-800">
                A treacherous reef has been spotted near the Port of Health. Beware, sailors!
              </p>
            </div>
            <div className="bg-parchment p-4 rounded-lg">
              <h3 className="text-xl font-bold text-amber-900 mb-2">Medicine Chest Updated</h3>
              <p className="text-amber-800">
                Our AI parrot has learned to recognize new prescription scrolls. Try it out!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

