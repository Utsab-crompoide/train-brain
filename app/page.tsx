"use client";

import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SunIcon from "@/public/assets/sun-icon.svg";
import MoonIcon from "@/public/assets/moon-icon.svg";

const GAMES = [
  {
    id: "commonThread",
    title: "Common Thread",
    description: "Guess the common category from clues.",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    id: "finalWord",
    title: "Final Word",
    description: "Climb the ladder of words in this daily puzzle.",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    id: "letterchain",
    title: "Letter Shift Chain",
    description: "Change one letter at a time to reach the target word.",
    gradient: "from-orange-400 to-red-500",
  },
];

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  return (
    <div className={`flex min-h-screen flex-col items-center font-sans transition-colors duration-300 ${isDark ? "bg-gray-950" : "bg-white"}`}>
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`fixed top-4 right-4 z-50 flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-all duration-300 ${isDark ? "bg-gray-800 hover:bg-gray-700 text-yellow-300" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}`}
      >
        {isDark ? <Image src={MoonIcon} alt="Toggle theme" width={20} height={20} /> : <Image src={SunIcon} alt="Toggle theme" width={20} height={20} />}
      </button>

      <main className="flex w-full max-w-5xl flex-col items-center px-6 py-24 sm:px-12">
        <h1 className="mb-16 text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-orange-400 to-yellow-500 sm:text-7xl">Games</h1>

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
          {GAMES.map((game) => (
            <div key={game.id} className={`flex flex-col justify-between rounded-3xl p-8 shadow-xl transition-transform hover:-translate-y-2 cursor-pointer bg-linear-to-br ${game.gradient}`}>
              <div>
                <h2 className="mb-4 text-3xl font-bold text-white">{game.title}</h2>
                <p className="text-lg font-medium text-white/90">{game.description}</p>
              </div>
              <div className="mt-8 flex justify-end" onClick={() => router.push(`/${game.id}`)}>
                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white backdrop-blur-md">Play Now</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
