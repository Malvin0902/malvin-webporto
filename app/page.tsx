"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import IntroSection from "@/components/intro-section"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import AboutSection from "@/components/about-section"
import DotBackground from "@/components/ui/dot-background"

// Dynamically import the Cursor component with no SSR
const Cursor = dynamic(() => import("@/components/cursor"), { ssr: false })

export default function Home() {
  const [activeSection, setActiveSection] = useState("intro")
  const [isLoading, setIsLoading] = useState(true)

  // Add this function to handle section changes and scroll to top
  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    // Disable default cursor
    document.body.style.cursor = "none"

    // Hide loading screen after delay
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      document.body.style.cursor = "auto"
      clearTimeout(loadingTimer)
    }
  }, [])

  return (
    <DotBackground className="min-h-screen">
      <Cursor />

      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-white dark:bg-black z-50 flex items-center justify-center transition-opacity duration-300">
          <div className="text-2xl typing-effect">loading...</div>
        </div>
      )}

      {/* Navbar */}
      <Navbar activeSection={activeSection} setActiveSection={handleSectionChange} />

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        {activeSection === "intro" && <IntroSection setActiveSection={handleSectionChange} />}
        {activeSection === "projects" && <ProjectsSection setActiveSection={handleSectionChange} />}
        {activeSection === "skills" && <SkillsSection setActiveSection={handleSectionChange} />}
        {activeSection === "about" && <AboutSection setActiveSection={handleSectionChange} />}
      </div>
    </DotBackground>
  )
}
