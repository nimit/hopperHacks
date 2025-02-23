'use client';

import type React from 'react';
import Image from 'next/image';

import { useState } from 'react';

import { useUser } from '../context/UserContext';

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { user, setUser } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login/signup logic here
    console.log('Form submitted:', { email, password, confirmPassword });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/pirate-hideout-bg.jpg')" }}
    >
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
      <div className="bg-wood p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-amber-900 mb-6 pirate-font">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-parchment text-amber-900 placeholder-amber-700"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-parchment text-amber-900 placeholder-amber-700"
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded bg-parchment text-amber-900 placeholder-amber-700"
              required
            />
          )}
          <button type="submit" className="w-full btn-pirate">
            Embark on yer journey!
          </button>
        </form>
        <p className="mt-4 text-center text-amber-900">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-amber-600 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
