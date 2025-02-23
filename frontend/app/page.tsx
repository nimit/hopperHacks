import Link from "next/link"
import Image from "next/image"
import { Compass, Map, Pill } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-parchment relative overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/treasure-map-bg.jpg"
          alt="Treasure map background"
          layout="fill"
          objectFit="cover"
          style={{ opacity: 0.2 }}
        />
      </div>

      {/* Floating compass */}
      <div className="absolute top-10 right-10 z-20 animate-float">
        <Image src="/compass.png" alt="Floating compass" width={150} height={150} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-brown mb-8 pirate-font drop-shadow-lg">SpotiFind Rx</h1>
            <p className="text-2xl text-brown-dark mb-12 drop-shadow-md">
              Ahoy! Set sail to find and log obstacles or prescriptions, matey!
            </p>
            <div className="flex justify-center">
              <Link href="/auth" className="btn-pirate text-xl px-8 py-4 animate-bounce">
                Join the Crew
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-parchment-light p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <Compass className="mx-auto mb-4 text-brown" size={48} />
              <h2 className="text-2xl font-bold text-brown mb-2 pirate-font">Navigate Health</h2>
              <p className="text-brown-dark">
                Chart your course through the treacherous seas of health with our pirate-themed guidance.
              </p>
            </div>
            <div className="bg-parchment-light p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <Map className="mx-auto mb-4 text-brown" size={48} />
              <h2 className="text-2xl font-bold text-brown mb-2 pirate-font">Treasure Map</h2>
              <p className="text-brown-dark">
                Discover and report obstacles on our interactive map to help fellow buccaneers.
              </p>
            </div>
            <div className="bg-parchment-light p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <Pill className="mx-auto mb-4 text-brown" size={48} />
              <h2 className="text-2xl font-bold text-brown mb-2 pirate-font">Prescription Plunder</h2>
              <p className="text-brown-dark">
                Unlock the secrets of your prescriptions with our AI-powered decoding system.
              </p>
            </div>
          </div>

          <div className="bg-brown-dark p-8 rounded-lg shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-parchment mb-4 pirate-font">Latest Treasure Updates</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-parchment p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-brown-dark mb-2">New Obstacle Reported</h3>
                  <p className="text-brown-dark">
                    A treacherous reef has been spotted near the Port of Health. Beware, sailors!
                  </p>
                </div>
                <div className="bg-parchment p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-brown-dark mb-2">Medicine Chest Updated</h3>
                  <p className="text-brown-dark">
                    Our AI parrot has learned to recognize new prescription scrolls. Try it out!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ship decoration */}
      <div className="absolute bottom-10 left-0 z-0 pointer-events-none animate-sail">
        <Image src="/pirate-ship.png" alt="Pirate ship" width={300} height={180} objectFit="contain" />
      </div>
    </div>
  )
}

