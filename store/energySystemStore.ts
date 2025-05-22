"use client"

import { create } from "zustand"

interface EnergySystemState {
  // Component states
  inverterActive: boolean
  switchActive: boolean
  showHeroSection: boolean
  showTagSection: boolean
  booting: boolean

  // Animation and metrics
  animationPhase: number
  energySaved: number
  co2Reduced: number

  // State update functions
  setInverterActive: (active: boolean) => void
  setSwitchActive: (active: boolean) => void
  setShowHeroSection: (show: boolean) => void
  setShowTagSection: (show: boolean) => void
  setAnimationPhase: (phase: number) => void
  incrementEnergySaved: () => void
  incrementCo2Reduced: () => void
  setBooting: (booting: boolean) => void

  // Utility functions
  activateFullSystem: () => void
  deactivateFullSystem: () => void
}

export const useEnergySystemStore = create<EnergySystemState>((set, get) => ({
  // Initial states
  inverterActive: true,
  switchActive: true,
  showHeroSection: true,
  showTagSection: true,
  booting: false,
  animationPhase: 1,
  energySaved: 0,
  co2Reduced: 0,

  // Core state update functions
  setInverterActive: (active) =>
    set((state) => {
      if (!active) {
        return {
          inverterActive: false,
          switchActive: false,
          showHeroSection: false,
          showTagSection: false,
          animationPhase: 0,
          energySaved: state.energySaved,
          co2Reduced: state.co2Reduced,
        }
      }
      return {
        ...state,
        inverterActive: active,
        showHeroSection: true,
        showTagSection: true,
        animationPhase: 1,
      }
    }),

  setSwitchActive: (active) =>
    set((state) => {
      // Only allow switch activation if inverter is active
      if (!state.inverterActive) {
        return state
      }
      if (active) {
        return {
          ...state,
          switchActive: true,
          animationPhase: 0,
        }
      }
      // When switch is OFF
      return {
        ...state,
        switchActive: false,
      }
    }),

  setShowHeroSection: (show) =>
    set((state) => ({
      ...state,
      showHeroSection: show,
    })),

  setShowTagSection: (show) =>
    set((state) => ({
      ...state,
      showTagSection: show,
    })),

  setAnimationPhase: (phase) => set((state) => ({ ...state, animationPhase: phase })),

  incrementEnergySaved: () =>
    set((state) => ({ ...state, energySaved: state.energySaved + 0.05 })),

  incrementCo2Reduced: () =>
    set((state) => ({ ...state, co2Reduced: state.co2Reduced + 0.02 })),

  setBooting: (booting) => set((state) => ({ ...state, booting })),

  // Utility functions
  activateFullSystem: () =>
    set((state) => ({
      ...state,
      inverterActive: true,
      switchActive: true,
      showHeroSection: true,
      showTagSection: true,
      animationPhase: 1,
    })),

  deactivateFullSystem: () =>
    set((state) => ({
      ...state,
      inverterActive: false,
      switchActive: false,
      showHeroSection: false,
      showTagSection: false,
      animationPhase: 0,
    })),
}))
