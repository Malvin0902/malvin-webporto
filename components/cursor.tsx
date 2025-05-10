"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on a mobile device
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    }

    // Initial check
    checkMobile()

    // Add listener for screen size changes
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Skip cursor effects on mobile
    if (isMobile) return

    let inactivityTimer: NodeJS.Timeout

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      // Reset inactivity timer
      clearTimeout(inactivityTimer)
      inactivityTimer = setTimeout(() => {
        setIsVisible(false)
      }, 5000)
    }

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y)
      setIsPointer(
        hoveredElement?.classList.contains("interactive-element") ||
          hoveredElement?.tagName === "BUTTON" ||
          hoveredElement?.tagName === "A" ||
          !!hoveredElement?.closest("button, a, .interactive-element"),
      )
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousemove", updateCursorType)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    // Initial inactivity timer
    inactivityTimer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousemove", updateCursorType)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      clearTimeout(inactivityTimer)
    }
  }, [position, isMobile])

  // Don't render cursor on mobile
  if (isMobile) return null

  return (
    <motion.div
      className="cursor"
      animate={{
        x: position.x,
        y: position.y,
        scale: isPointer ? 1.2 : isClicking ? 0.8 : 1,
        opacity: isVisible ? 0.8 : 0,
        backgroundColor: isClicking ? "rgba(255, 255, 255, 0.2)" : "transparent",
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
        mass: 0.5,
      }}
    >
      <motion.div
        className="cursor-dot"
        animate={{
          scale: isClicking ? 1.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}
