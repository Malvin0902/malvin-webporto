"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Selected greetings that work well visually
const greetings = [
  { text: "hi", language: "English" },
  { text: "hola", language: "Spanish" },
  { text: "bonjour", language: "French" },
  { text: "ciao", language: "Italian" },
  { text: "hallo", language: "German" },
  { text: "olá", language: "Portuguese" },
  { text: "hej", language: "Swedish" },
  { text: "salut", language: "Romanian" },
  { text: "ahoj", language: "Czech" },
  { text: "hei", language: "Finnish" },
  { text: "你好", language: "Chinese" },
  { text: "こんにちは", language: "Japanese" },
  { text: "안녕하세요", language: "Korean" },
  { text: "नमस्ते", language: "Hindi" },
  { text: "مرحبا", language: "Arabic" },
  { text: "привет", language: "Russian" },
]

export default function Greeting() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % greetings.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative inline-block min-h-[1.5em] min-w-[8em] whitespace-nowrap">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 top-0 inline-block"
        >
          {greetings[currentIndex].text}.
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
