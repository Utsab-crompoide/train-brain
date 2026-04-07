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
    image: "/assets/commonThread.png",
  },
  {
    id: "finalWord",
    title: "Final Word",
    description: "Climb the ladder of words in this daily puzzle.",
    image: "/assets/finalWord.png",
  },
  {
    id: "theLiar",
    title: "The Liar",
    description: "Identify the lie among the statements.",
    image: "/assets/theLiar.png",
  },
  {
    id: "whoSaidIt",
    title: "Who Said It?",
    description: "Guess who said what.",
    image: "/assets/whoSaidIt.png",
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
        <h1 className={`mb-16 text-6xl font-extrabold tracking-tight sm:text-7xl ${isDark ? "text-gray-100" : "text-gray-900"}`}>Games</h1>

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
          {GAMES.map((game, index) => (
            <div key={game.id} className="relative overflow-hidden rounded-3xl shadow-xl transition-transform hover:-translate-y-2 cursor-pointer h-60 sm:h-80 group" onClick={() => router.push(`/${game.id}`)}>
              {/* Background Image */}
              <Image src={game.image} alt={game.title} fill className="object-cover object-center transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading={index === 0 ? "eager" : "lazy"} priority={index === 0} />
              {/* <img src={game.image} alt={game.title} className="object-cover object-center transition-transform duration-300 group-hover:scale-105" loading={index === 0 ? "eager" : "lazy"} /> */}
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
