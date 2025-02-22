import Link from "next/link"
import { Compass, Map, Pill, Anchor } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-wood text-amber-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2 pirate-font flex items-center">
              <Anchor className="mr-2" />
              SpotiFind Rx
            </h3>
            <p>Navigate the treacherous seas of health with our pirate-themed medical assistance!</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul>
              <li>
                <Link href="/map" className="hover:text-amber-600 transition-colors flex items-center">
                  <Map className="mr-1" size={18} />
                  Treasure Map
                </Link>
              </li>
              <li>
                <Link href="/add-obstacle" className="hover:text-amber-600 transition-colors flex items-center">
                  <Compass className="mr-1" size={18} />
                  Report Obstacle
                </Link>
              </li>
              <li>
                <Link href="/add-prescription" className="hover:text-amber-600 transition-colors flex items-center">
                  <Pill className="mr-1" size={18} />
                  Add Prescription
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Pirate's Code</h4>
            <ul>
              <li>Always be honest about yer health</li>
              <li>Help fellow pirates navigate obstacles</li>
              <li>Keep yer prescriptions organized</li>
              <li>Respect the privacy of other crew members</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} SpotiFind Rx. All rights reserved, ye scurvy dogs!</p>
        </div>
      </div>
    </footer>
  )
}

