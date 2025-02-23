'use client';
import { useUser } from '../context/UserContext';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Anchor, Skull } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const { user, setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const endpoint = `/api/auth/login?email=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(password)}`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        router.push('/');
      } else {
        alert(data.message);
      }
    } else {
      const endpoint = '/api/auth/signup';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        router.push('/');
      } else {
        alert(data.message);
      }
    }
  };

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/treasure-map-bg.jpg')",
          opacity: 0.2,
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="min-h-screen flex items-center justify-center">
        <div
          className=" p-8 rounded-lg shadow-lg w-96 pirate-border relative"
          style={{ backgroundColor: 'rgb(244 225 193)' }}
        >
          <div className="flex justify-center mb-6">
            <Anchor className="text-amber-600" size={48} />
          </div>
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-6 pirate-font">
            {isLogin ? 'Board the Ship' : 'Join the Crew'}
          </h2>
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              variant={isLogin ? 'default' : 'outline'}
              onClick={() => setIsLogin(true)}
              className="w-1/2"
            >
              Login
            </Button>
            <Button
              variant={!isLogin ? 'default' : 'outline'}
              onClick={() => setIsLogin(false)}
              className="w-1/2"
            >
              Sign Up
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-amber-900">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-parchment text-amber-900 placeholder-amber-700"
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-amber-900">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="captain@pirate.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-parchment text-amber-900 placeholder-amber-700"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-amber-900">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-parchment text-amber-900 placeholder-amber-700"
                required
              />
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-amber-900">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-parchment text-amber-900 placeholder-amber-700"
                  required
                />
              </div>
            )}
            <Button type="submit" className="w-full btn-pirate">
              {isLogin ? 'Set Sail!' : 'Join the Crew!'}
            </Button>
          </form>
          {isLogin && (
            <p className="mt-4 text-center text-amber-900">
              <a href="#" className="hover:underline">
                Forgot yer treasure map?
              </a>
            </p>
          )}
          <div className="mt-6 flex items-center justify-center">
            <Skull className="text-amber-600 mr-2" size={20} />
            <span className="text-amber-900">
              Pirate's Code: No landlubbers allowed!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
