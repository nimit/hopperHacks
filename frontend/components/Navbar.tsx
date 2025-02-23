'use client';
import Link from 'next/link';
import { Anchor, Map, Pill, User } from 'lucide-react';

import { useUser } from '../app/context/UserContext';

export default function Navbar() {
  const { user, setUser } = useUser();
  return (
    <nav className="bg-wood p-4 text-amber-900">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold pirate-font flex items-center"
        >
          <Anchor className="mr-2" />
          SpotiFind Rx
        </Link>
        <ul className="flex space-x-4">
          <li>
            {user ? (
              <Link
                href="/map"
                className="hover:text-amber-600 transition-colors flex items-center"
              >
                <Map className="mr-1" size={18} />
                Treasure Map
              </Link>
            ) : (
              <Link
                href="/auth"
                className="hover:text-amber-600 transition-colors flex items-center"
              >
                <Map className="mr-1" size={18} />
                Treasure Map
              </Link>
            )}
          </li>
          <li>
            {user ? (
              <Link
                href="/add-obstacle"
                className="hover:text-amber-600 transition-colors flex items-center"
              >
                <Pill className="mr-1" size={18} />
                Add Obstacle
              </Link>
            ) : (
              <Link
                href="/auth"
                className="hover:text-amber-600 transition-colors flex items-center"
              >
                <Pill className="mr-1" size={18} />
                Add Obstacle
              </Link>
            )}
          </li>
          <li>
            {user ? (
              <Link
                href="/add-prescription"
                className="hover:text-amber-600 transition-colors flex items-center"
              >
                <Pill className="mr-1" size={18} />
                Add Prescription
              </Link>
            ) : (
              <Link
                href="/auth"
                className="hover:text-amber-600 transition-colors flex items-center"
              >
                <Pill className="mr-1" size={18} />
                Add Prescription
              </Link>
            )}
          </li>
          <li>
            {user ? (
              <div className="flex items-center space-x-2">
                <User className="mr-1" size={18} />
                <span>{user.name}</span>
                <button
                  onClick={() => setUser(null)}
                  className="bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-1 px-4 rounded"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="hover:text-amber-600 transition-colors flex items-center"
              >
                <User className="mr-1" size={18} />
                Login / Sign Up
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
