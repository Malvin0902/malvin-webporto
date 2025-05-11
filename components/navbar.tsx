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
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: 1.8,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      style={{ 
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        perspective: "1000px",
        willChange: "transform, opacity"
      }}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? "py-3 bg-black/90 backdrop-blur-sm" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          className="text-sm interactive-element"
          whileHover={{ opacity: 0.7 }}
          transition={{ duration: 0.2 }}
          style={{ 
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            perspective: "1000px",
            willChange: "opacity"
          }}
          onClick={() => handleSectionChange("intro")}
        >
          portfolio
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              className={`interactive-element text-xs ${activeSection === item.id ? "opacity-100" : "opacity-50"}`}
              onClick={() => handleSectionChange(item.id)}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{ 
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                perspective: "1000px",
                willChange: "opacity"
              }}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  className="h-px bg-white mt-1"
                  layoutId="activeNavSection"
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    mass: 0.5
                  }}
                  style={{ 
                    transform: "translate3d(0, 0, 0)",
                    backfaceVisibility: "hidden",
                    perspective: "1000px",
                    willChange: "transform"
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Contact Link (Desktop) */}
        <motion.a
          href="mailto:hello@example.com"
          className="hidden md:block text-xs interactive-element"
          whileHover={{ opacity: 0.7 }}
          transition={{ duration: 0.2 }}
          style={{ 
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            perspective: "1000px",
            willChange: "opacity"
          }}
        >
          contact
        </motion.a>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden interactive-element p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          style={{ 
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            perspective: "1000px",
            willChange: "transform"
          }}
        >
          {mobileMenuOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.16, 1, 0.3, 1],
              height: {
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
            style={{ 
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
              perspective: "1000px",
              willChange: "transform, opacity, height"
            }}
            className="md:hidden bg-black/95 backdrop-blur-sm overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  className={`interactive-element text-left text-sm py-2 ${
                    activeSection === item.id ? "opacity-100" : "opacity-60"
                  }`}
                  onClick={() => handleSectionChange(item.id)}
                  whileHover={{ x: 5, opacity: 1 }}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: activeSection === item.id ? 1 : 0.6 }}
                  transition={{ 
                    duration: 0.2,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  style={{ 
                    transform: "translate3d(0, 0, 0)",
                    backfaceVisibility: "hidden",
                    perspective: "1000px",
                    willChange: "transform, opacity"
                  }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="h-px bg-white mt-1 w-8"
                      layoutId="activeMobileNavSection"
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 30,
                        mass: 0.5
                      }}
                      style={{ 
                        transform: "translate3d(0, 0, 0)",
                        backfaceVisibility: "hidden",
                        perspective: "1000px",
                        willChange: "transform"
                      }}
                    />
                  )}
                </motion.button>
              ))}

              {/* Contact Link (Mobile) */}
              <motion.a
                href="mailto:hello@example.com"
                className="text-sm interactive-element block py-2"
                whileHover={{ x: 5, opacity: 0.7 }}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 0.6 }}
                transition={{ 
                  duration: 0.2, 
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{ 
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                  perspective: "1000px",
                  willChange: "transform, opacity"
                }}
              >
                contact
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
