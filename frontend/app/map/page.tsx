'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

export default function TreasureMap() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-amber-900 mb-8 pirate-font text-center">
        Treasure Map
      </h1>
      <div className="relative">
        <iframe
          width="100%"
          height="400"
          style={{ border: 'none', opacity: '0.5' }} // Reduced opacity for the iframe
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1000%2C51.5000%2C-0.0900%2C51.5100&layer=mapnik"
        ></iframe>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-4 rounded-lg">
          <p className="text-3xl font-bold text-center text-amber-900">
            {' '}
            Coming Soon
          </p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-amber-800 text-lg font-pirate">
          Hover over the map pins to reveal obstacle details, ye curious sailor!
        </p>
      </div>
    </div>
  );
}
