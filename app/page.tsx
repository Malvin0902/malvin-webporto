"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import IntroSection from "@/components/intro-section"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import AboutSection from "@/components/about-section"

// Dynamically import the Cursor component with no SSR
const Cursor = dynamic(() => import("@/components/cursor"), { ssr: false })

export default function Home() {
  const [activeSection, setActiveSection] = useState("intro")
  const [showGrid, setShowGrid] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Add this function to handle section changes and scroll to top
  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    // Disable default cursor
    document.body.style.cursor = "none"

    // Show grid after a delay
    const gridTimer = setTimeout(() => {
      setShowGrid(true)
    }, 1000)

    // Hide loading screen after delay
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      document.body.style.cursor = "auto"
      clearTimeout(gridTimer)
      clearTimeout(loadingTimer)
    }
  }, [])

  return (
    <main className="min-h-screen relative">
      <Cursor />

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <div className="text-2xl typing-effect">loading...</div>
          </div>
        )}
      </AnimatePresence>

      {/* Grid Background */}
      <div className={`fixed inset-0 transition-opacity duration-1000 ${showGrid ? "opacity-100" : "opacity-0"}`}>
        <div className="grid-background absolute inset-0"></div>
      </div>

      {/* Navbar */}
      <Navbar activeSection={activeSection} setActiveSection={handleSectionChange} />

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <AnimatePresence mode="wait">
          {activeSection === "intro" && <IntroSection key="intro" setActiveSection={handleSectionChange} />}

          {activeSection === "projects" && <ProjectsSection key="projects" setActiveSection={handleSectionChange} />}

          {activeSection === "skills" && <SkillsSection key="skills" setActiveSection={handleSectionChange} />}

          {activeSection === "about" && <AboutSection key="about" setActiveSection={handleSectionChange} />}
        </AnimatePresence>
      </div>
    </main>
  )
}
