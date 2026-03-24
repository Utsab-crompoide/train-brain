'use client'
import React from 'react'
import { useTheme } from '@/context/ThemeContext'

export default function Crossclimb() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
  return (
    <div
      className={`flex min-h-screen flex-col items-center font-sans transition-colors duration-300 ${
        isDark ? "bg-gray-950" : "bg-white"
      }`}
    >
        <main className="flex w-full max-w-5xl flex-col items-center px-6 py-24 sm:px-12">
        <h1 className="mb-16 text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-500 sm:text-7xl">
          Crossclimb
        </h1>
        </main>
    </div>
  )
}