"use client"

import { useState, useEffect } from "react"

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
        hoveredElement?.tagName === "BUTTON" ||
          hoveredElement?.tagName === "A" ||
          !!hoveredElement?.closest("button, a"),
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

  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: `translate(-50%, -50%) scale(${isPointer ? 1.2 : isClicking ? 0.8 : 1})`,
    opacity: isVisible ? 0.8 : 0,
    backgroundColor: isClicking ? "rgba(var(--foreground), 0.2)" : "transparent",
  }

  const dotStyle = {
    transform: `translate(-50%, -50%) scale(${isClicking ? 1.5 : 1})`,
  }

  return (
    <div className="cursor" style={cursorStyle}>
      <div className="cursor-dot" style={dotStyle} />
    </div>
  )
}
