"use client"

import { useRef, useState, useEffect } from "react"
import { playSound } from "@/utils/audio-utils"
import { logError } from "@/utils/error-logging"

interface InverterAudioProps {
  inverterOn: boolean
  fanSpeed: number
  faultCondition: boolean
}

export function InverterAudio({ inverterOn, fanSpeed, faultCondition }: InverterAudioProps) {
  const inverterHumRef = useRef<HTMLAudioElement>(null)
  const fanNoiseRef = useRef<HTMLAudioElement>(null)
  const buttonClickRef = useRef<HTMLAudioElement>(null)
  const alarmRef = useRef<HTMLAudioElement>(null)

  const [humVolume, setHumVolume] = useState(0)
  const [fanVolume, setFanVolume] = useState(0)
  const [audioEnabled, setAudioEnabled] = useState(true)

  // Handle audio playback based on inverter state
  useEffect(() => {
    if (inverterHumRef.current) {
      if (inverterOn) {
        inverterHumRef.current.volume = 0.3
        inverterHumRef.current.play().catch(console.error)
        setHumVolume(0.3)
      } else {
        inverterHumRef.current.pause()
        setHumVolume(0)
      }
    }
  }, [inverterOn])

  // Handle fan noise based on fan speed
  useEffect(() => {
    if (fanNoiseRef.current) {
      const volume = fanSpeed / 100
      fanNoiseRef.current.volume = volume
      setFanVolume(volume)

      if (fanSpeed > 0) {
        fanNoiseRef.current.play().catch(console.error)
      } else {
        fanNoiseRef.current.pause()
      }
    }
  }, [fanSpeed])

  // Handle alarm sound
  useEffect(() => {
    if (alarmRef.current && faultCondition) {
      alarmRef.current.play().catch(console.error)
    }
  }, [faultCondition])

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      [inverterHumRef, fanNoiseRef, buttonClickRef, alarmRef].forEach(ref => {
        if (ref.current) {
          ref.current.pause()
          ref.current.currentTime = 0
        }
      })
    }
  }, [])

  const playButtonClick = () => {
    playSound(buttonClickRef.current)
  }

  // Handle audio errors
  const handleAudioError = (soundType: string) => {
    setAudioEnabled(false);
    logError(
      `Sound file not found: ${soundType}`,
      undefined,
      'warning',
      { feature: 'InverterAudio', soundType }
    );
  };

  return (
    <>
      <audio
        ref={inverterHumRef}
        src="/sounds/inverter-hum.mp3"
        loop
        preload="auto"
        onError={() => handleAudioError('inverter-hum.mp3')}
      />
      <audio
        ref={fanNoiseRef}
        src="/sounds/fan-noise.mp3"
        loop
        preload="none"
        onError={() => handleAudioError('fan-noise.mp3')}
      />
      <audio
        ref={buttonClickRef}
        src="/sounds/button-click.mp3"
        preload="none"
        onError={() => handleAudioError('button-click.mp3')}
      />
      <audio
        ref={alarmRef}
        src="/sounds/alarm.mp3"
        preload="none"
        onError={() => handleAudioError('alarm.mp3')}
      />
    </>
  )
} 