"use client"

import { useState, useEffect } from "react"

interface TypewriterEffectProps {
  text: string
  delay?: number
  onComplete?: () => void
}

export default function TypewriterEffect({ text, delay = 50, onComplete }: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    } else if (!isComplete) {
      setIsComplete(true)
      onComplete?.()
    }
  }, [currentIndex, delay, isComplete, onComplete, text])

  return <span className={`${!isComplete ? "typing-effect" : ""}`}>{displayText}</span>
}
