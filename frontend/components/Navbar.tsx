import Link from "next/link"
import { Anchor, Map, Pill, User } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="bg-wood p-4 text-amber-900">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold pirate-font flex items-center">
          <Anchor className="mr-2" />
          SpotiFind Rx
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/map" className="hover:text-amber-600 transition-colors flex items-center">
              <Map className="mr-1" size={18} />
              Treasure Map
            </Link>
          </li>
          <li>
            <Link href="/add-obstacle" className="hover:text-amber-600 transition-colors flex items-center">
              <Pill className="mr-1" size={18} />
              Report Obstacle
            </Link>
          </li>
          <li>
            <Link href="/add-prescription" className="hover:text-amber-600 transition-colors flex items-center">
              <Pill className="mr-1" size={18} />
              Add Prescription
            </Link>
          </li>
          <li>
            <Link href="/auth" className="hover:text-amber-600 transition-colors flex items-center">
              <User className="mr-1" size={18} />
              Login / Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

