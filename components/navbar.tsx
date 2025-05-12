"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when changing sections
  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    setMobileMenuOpen(false)
  }

  const navItems = [
    { id: "intro", label: "intro" },
    { id: "projects", label: "projects" },
    { id: "skills", label: "skills" },
    { id: "about", label: "about" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-white/90 dark:bg-black/90 backdrop-blur-sm" // Removed the border here
            : "py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-sm cursor-pointer font-mono" onClick={() => handleSectionChange("intro")}>
            portfolio
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`text-xs font-mono ${activeSection === item.id ? "opacity-100" : "opacity-50"} hover:opacity-100 transition-opacity`}
                onClick={() => handleSectionChange(item.id)}
              >
                {item.label}
                {activeSection === item.id && <div className="h-px bg-current mt-1" />}
              </button>
            ))}
          </div>

          {/* Contact Link (Desktop) */}
          <div className="hidden md:flex items-center">
            <a
              href="mailto:hello@example.com"
              className="text-xs font-mono opacity-70 hover:opacity-100 transition-opacity"
            >
              contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-white dark:bg-black"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative h-full flex flex-col justify-center items-center"
            >
              <div className="absolute top-6 right-6">
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col items-center space-y-8">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                    className={`text-2xl font-mono ${activeSection === item.id ? "opacity-100" : "opacity-60"} hover:opacity-100 transition-opacity`}
                    onClick={() => handleSectionChange(item.id)}
                  >
                    {item.label}
                  </motion.button>
                ))}

                <motion.a
                  href="mailto:hello@example.com"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="text-xl opacity-60 hover:opacity-100 transition-opacity mt-4 font-mono"
                >
                  contact
                </motion.a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
