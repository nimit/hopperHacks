"use client"

import { useState, useEffect, useCallback } from "react"
import { Mic, MicOff, X } from "lucide-react"

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export default function VoiceCommandButton() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const newRecognition = new SpeechRecognition()
      newRecognition.continuous = false
      newRecognition.lang = "en-US"
      newRecognition.interimResults = false
      newRecognition.maxAlternatives = 1

      newRecognition.onresult = (event: any) => {
        const last = event.results.length - 1
        const command = event.results[last][0].transcript
        setTranscript(command)
        processCommand(command)
      }

      newRecognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        setIsRecording(false)
      }

      newRecognition.onend = () => {
        setIsRecording(false)
      }

      setRecognition(newRecognition)
    }
  }, [])

  const processCommand = useCallback((command: string) => {
    // Implement your command processing logic here
    console.log("Processing command:", command)
    // Example: if (command.toLowerCase().includes('go to map')) { // navigate to map }
  }, [])

  const handleVoiceCommand = () => {
    if (recognition) {
      setIsRecording(true)
      setIsExpanded(true)
      recognition.start()
    } else {
      console.error("Speech recognition not supported")
    }
  }

  const stopRecording = () => {
    if (recognition) {
      recognition.stop()
    }
    setIsRecording(false)
    setIsExpanded(false)
    setTranscript("")
  }

  return (
    <div className={`fixed bottom-4 right-4 transition-all duration-300 ease-in-out ${isExpanded ? "w-64" : "w-16"}`}>
      <div
        className={`bg-wood p-4 rounded-full shadow-lg flex items-center justify-between ${isExpanded ? "rounded-full" : ""}`}
      >
        {isExpanded ? (
          <>
            <div className="flex-grow mr-2">
              {isRecording ? (
                <p className="text-amber-900 animate-pulse">Recording...</p>
              ) : (
                <p className="text-amber-900">{transcript || "Speak, ye scurvy dog!"}</p>
              )}
            </div>
            <button onClick={stopRecording} className="text-amber-900 hover:text-amber-700">
              <X size={24} />
            </button>
          </>
        ) : (
          <button
            onClick={handleVoiceCommand}
            className={`w-full h-full flex items-center justify-center ${isRecording ? "pulse-ring pulse-dot" : ""}`}
          >
            {isRecording ? (
              <MicOff className="text-amber-900" size={24} />
            ) : (
              <Mic className="text-amber-900" size={24} />
            )}
          </button>
        )}
      </div>
      {isExpanded && (
        <div className="mt-2 bg-parchment p-2 rounded-lg shadow-md">
          <p className="text-amber-900 text-sm">
            {isRecording ? "Listening for yer command..." : "Click the button and speak yer mind!"}
          </p>
        </div>
      )}
    </div>
  )
}

