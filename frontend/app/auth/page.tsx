"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Anchor, Skull } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      console.log("Logging in with:", { email, password })
      // Add login logic here
    } else {
      if (password !== confirmPassword) {
        alert("Arr! Yer passwords don't match, ye scurvy dog!")
        return
      }
      console.log("Signing up with:", { email, password })
      // Add signup logic here
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/pirate-ship-interior.jpg')" }}
    >
      <div className="bg-wood p-8 rounded-lg shadow-lg w-96 pirate-border">
        <div className="flex justify-center mb-6">
          <Anchor className="text-amber-600" size={48} />
        </div>
        <h2 className="text-3xl font-bold text-center text-amber-900 mb-6 pirate-font">
          {isLogin ? "Board the Ship" : "Join the Crew"}
        </h2>
        <div className="flex justify-center space-x-4 mb-6">
          <Button variant={isLogin ? "default" : "outline"} onClick={() => setIsLogin(true)} className="w-1/2">
            Login
          </Button>
          <Button variant={!isLogin ? "default" : "outline"} onClick={() => setIsLogin(false)} className="w-1/2">
            Sign Up
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            {isLogin ? "Set Sail!" : "Join the Crew!"}
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
          <span className="text-amber-900">Pirate's Code: No landlubbers allowed!</span>
        </div>
      </div>
    </div>
  )
}

