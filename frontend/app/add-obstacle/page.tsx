'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

// Function to convert a file to Base64
const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export default function AddObstacle() {
  const router = useRouter();
  const [obstacleType, setObstacleType] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { user } = useUser();
  useEffect(() => {
    if (!user) {
      window.location.href = '/auth';
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !obstacleType ||
      !description ||
      (latitude === '' && longitude === '')
    ) {
      setError('Ye need to fill all the required fields, ye scurvy dog!');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Prepare the data to be sent to the API
    const obstacleData = {
      type: obstacleType,
      description,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      photo: photo ? await toBase64(photo) : null,
    };

    // Make the API call to add the obstacle
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
      // Reset form
      setObstacleType('');
      setDescription('');
      setLatitude('');
      setLongitude('');
      setPhoto(null);
      router.push('/');
    } else {
      setError(data.message);
    }

    setIsLoading(false);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        (error) => {
          alert('Unable to retrieve your location. Please enter it manually.');
          console.error(error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="min-h-screen bg-parchment py-12 px-4 sm:px-6 lg:px-8">
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
              <label
                htmlFor="obstacleType"
                className="block text-brown font-bold mb-2"
              >
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
                <option value="uneven-surface">Uneven Surface</option>
                <option value="obstructed-path">Obstructed Path</option>
                <option value="missing-signage">Missing Signage</option>
                <option value="poor-lighting">Poor Lighting</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-brown font-bold mb-2"
              >
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
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-brown font-bold mb-2"
              >
                Location
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-1/2 p-2 rounded bg-parchment text-brown border border-brown"
                  step="any"
                  required
                />
                <input
                  type="number"
                  placeholder="Longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-1/2 p-2 rounded bg-parchment text-brown border border-brown"
                  step="any"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="photo"
                className="block text-brown font-bold mb-2"
              >
                Photo (optional)
              </label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={(e) =>
                  setPhoto(e.target.files ? e.target.files[0] : null)
                }
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

        <div className="bg-brown-dark p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-3xl font-bold text-parchment mb-4 pirate-font">
            Map Preview
          </h3>
          <div className="relative bg-parchment h-64 w-full rounded-lg overflow-hidden">
            {/* Map Iframe */}
            <iframe
              width="100%"
              height="100%"
              style={{ border: 'none', opacity: '0.5' }}
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1000%2C51.5000%2C-0.0900%2C51.5100&layer=mapnik"
            ></iframe>
            {/* "Coming Soon" Overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-4 rounded-lg">
              <p className="text-3xl font-bold text-center text-brown">
                {' '}
                Coming Soon
              </p>
            </div>
          </div>
        </div>

        <div className="bg-parchment-light p-6 rounded-lg shadow-lg">
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
