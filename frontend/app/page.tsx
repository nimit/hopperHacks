import Link from "next/link"
import Image from "next/image"
import { Compass, Map, Pill } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <Image src="/ocean-bg.jpg" alt="Ocean background" layout="fill" objectFit="cover" />
      </div>
      <div className="absolute inset-0 z-10">
        <Image
          src="/treasure-map-overlay.jpg"
          alt="Treasure map overlay"
          layout="fill"
          objectFit="cover"
          style={{ opacity: 0.2 }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <Image src="/pirate-ship.png" alt="Pirate ship" width={300} height={200} objectFit="contain" />
      </div>
      <div className="absolute top-20 right-20 z-20 animate-float">
        <Image src="/compass.png" alt="Floating compass" width={100} height={100} />
      </div>

      {/* Content */}
      <div className="relative z-30">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-amber-900 mb-8 pirate-font drop-shadow-lg">SpotiFind Rx</h1>
            <p className="text-2xl text-amber-800 mb-12 drop-shadow-md">
              Ahoy! Set sail to find and log obstacles or prescriptions, matey!
            </p>
            <div className="flex justify-center">
              <Link href="/auth" className="btn-pirate text-xl px-8 py-4 animate-bounce">
                Join the Crew
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-wood p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <Compass className="mx-auto mb-4 text-amber-600" size={48} />
              <h2 className="text-2xl font-bold text-amber-900 mb-2 pirate-font">Navigate Health</h2>
              <p className="text-amber-800">
                Chart your course through the treacherous seas of health with our pirate-themed guidance.
              </p>
            </div>
            <div className="bg-wood p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <Map className="mx-auto mb-4 text-amber-600" size={48} />
              <h2 className="text-2xl font-bold text-amber-900 mb-2 pirate-font">Treasure Map</h2>
              <p className="text-amber-800">
                Discover and report obstacles on our interactive map to help fellow buccaneers.
              </p>
            </div>
            <div className="bg-wood p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <Pill className="mx-auto mb-4 text-amber-600" size={48} />
              <h2 className="text-2xl font-bold text-amber-900 mb-2 pirate-font">Prescription Plunder</h2>
              <p className="text-amber-800">
                Unlock the secrets of your prescriptions with our AI-powered decoding system.
              </p>
            </div>
          </div>

          <div className="bg-wood p-8 rounded-lg shadow-lg relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10"
              style={{ backgroundImage: "url('/old-paper-texture.jpg')" }}
            ></div>
            <div className="relative z-10">
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
      </div>
    </div>
  )
}

