// components/AddObstacleComponent.tsx
'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import type { LatLngExpression, LeafletMouseEvent } from 'leaflet';
import Blank from './ui/blank';

// Leaflet CSS loader component
function LeafletCSS() {
  console.error("leaflet CSS loader start");
  useEffect(() => {
    console.log("leaflet CSS loading");
    require('leaflet/dist/leaflet.css');
  }, []);
  return <Blank />;
}

// Dynamic imports for Leaflet components
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const useMapEvents: any = dynamic(
  () => import('react-leaflet').then((mod) => mod.useMapEvents),
  { ssr: false }
);

// Function to convert file to Base64
const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Types for the location
type Location = {
  lat: number;
  lng: number;
};

export default function AddObstacle() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [obstacleType, setObstacleType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<Location | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const defaultLocation: Location = {
    lat: 40.90429256930786,
    lng: -73.1237618
  }; // SBU

  const getNonNullLocation = (): Location => {
    return location || defaultLocation;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!obstacleType || !description || !location) {
      setError('Ye need to fill all the required fields!');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const obstacleData = {
        type: obstacleType,
        description,
        latitude: location.lat,
        longitude: location.lng,
        photo: photo ? await toBase64(photo) : null,
      };

      const response = await fetch('/api/add-obstacle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obstacleData),
      });

      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        setObstacleType('');
        setDescription('');
        setPhoto(null);
        router.push('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to submit obstacle report');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setLocation(null);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  function MapClickHandler() {
    useMapEvents({
      click(e: LeafletMouseEvent) {
        const { lat, lng } = e.latlng;
        setLocation({ lat, lng });
      },
    });
    return null;
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-parchment py-12 px-4 sm:px-6 lg:px-8">
      <LeafletCSS />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-brown mb-8 pirate-font text-center">
          Report an Obstacle
        </h1>

        <div className="bg-parchment-light p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-brown mb-4 pirate-font">
            Mark Yer Danger on the Map
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="obstacleType" className="block text-brown font-bold mb-2">
                Type of Obstacle
              </label>
              <select
                id="obstacleType"
                value={obstacleType}
                onChange={(e) => setObstacleType(e.target.value)}
                className="w-full p-2 rounded bg-parchment text-brown border border-brown"
                required
              >
                <option value="">Select an obstacle type</option>
                <option value="reef">Treacherous Reef</option>
                <option value="whirlpool">Whirlpool</option>
                <option value="seamonster">Sea Monster</option>
                <option value="pirates">Rival Pirates</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-brown font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 rounded bg-parchment text-brown border border-brown"
                rows={4}
                required
                placeholder="Describe the danger ye've encountered..."
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-brown font-bold mb-2">
                Location
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Latitude"
                  value={location?.lat ?? ""}
                  onChange={(e) => setLocation(curr => ({ ...curr, lat: parseFloat(e.target.value) } as Location))}
                  className="w-1/2 p-2 rounded bg-parchment text-brown border border-brown"
                  step="any"
                  required
                />
                <input
                  type="number"
                  placeholder="Longitude"
                  value={location?.lng ?? ""}
                  onChange={(e) => setLocation(curr => ({ ...curr, lng: parseFloat(e.target.value) } as Location))}
                  className="w-1/2 p-2 rounded bg-parchment text-brown border border-brown"
                  step="any"
                  required
                />
              </div>
              <Button
                type="button"
                onClick={handleGetLocation}
                className="mt-2 btn-pirate"
              >
                Get Current Location
              </Button>
            </div>

            <div>
              <label htmlFor="photo" className="block text-brown font-bold mb-2">
                Photo (optional)
              </label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
                className="w-full p-2 rounded bg-parchment text-brown border border-brown"
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-pirate"
              disabled={isLoading}
            >
              {isLoading ? 'Marking the map...' : 'Report Obstacle'}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <AlertTriangle className="inline mr-2" />
              {error}
            </div>
          )}

          {isSuccess && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              <Info className="inline mr-2" />
              Yer obstacle has been successfully reported, matey!
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-brown mb-4 pirate-font">
            Mark Yer Danger on the Map
          </h2>
          
          <div style={{ height: '400px', width: '100%', position: 'relative' }}>
            {/* <MapContainer
              center={[getNonNullLocation().lat, getNonNullLocation().lng] as LatLngExpression}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapClickHandler />
              {location && (
                <Marker 
                  position={[location.lat, location.lng] as LatLngExpression}
                />
              )}
            </MapContainer> */}
          </div>

          <p className="mt-2">
            Selected Location: {location?.lat?.toFixed(5)} {location?.lng?.toFixed(5)}
          </p>
        </div>

        <div className="bg-parchment-light p-6 rounded-lg shadow-lg mt-8">
          <h2 className="text-3xl font-bold text-brown mb-4 pirate-font">
            Why Report Obstacles?
          </h2>
          <div className="space-y-4 text-brown-dark">
            <p>
              Reporting obstacles be crucial for the safety of all seafarers in
              our community. Here's why:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Ye help keep yer fellow pirates safe from harm</li>
              <li>Ye contribute to our ever-growing map of dangers</li>
              <li>Ye earn respect and trust among the pirate community</li>
              <li>Ye might save a life or a ship from peril</li>
            </ul>
            <p>
              Remember, a informed pirate be a safe pirate. Share yer knowledge
              and keep our waters safer for all!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}