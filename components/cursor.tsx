"use client"

import { useState, useEffect, useCallback, useRef } from "react"

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  
  const rafRef = useRef<number | undefined>(undefined)
  const lastTimeRef = useRef(0)
  const throttleMs = 1000 / 120 // 120fps for smoother movement

  // Memoize the mobile check function
  const checkMobile = useCallback(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches)
  }, [])

  useEffect(() => {
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [checkMobile])

  useEffect(() => {
    if (isMobile) return

    const updatePosition = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastTimeRef.current < throttleMs) return
      
      lastTimeRef.current = now
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
        setIsVisible(true)
      })
    }

    const updateCursorType = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = 
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable ||
        !!target.closest("button, a, [role='button'], [role='link']")
      
      if (isInteractive !== isPointer) {
        setIsPointer(isInteractive)
      }
    }

    const handleMouseDown = () => {
      setIsClicking(true)
      // Add a small delay to make the click animation feel more natural
      setTimeout(() => setIsClicking(false), 100)
    }

    window.addEventListener("mousemove", updatePosition, { passive: true })
    window.addEventListener("mousemove", updateCursorType, { passive: true })
    window.addEventListener("mousedown", handleMouseDown)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousemove", updateCursorType)
      window.removeEventListener("mousedown", handleMouseDown)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isMobile, isPointer])

  if (isMobile) return null

  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: `translate(-50%, -50%) scale(${isPointer ? 2 : isClicking ? 0.5 : 1})`,
    opacity: isVisible ? 1 : 0,
  }

  return <div className="cursor" style={cursorStyle} />
}
