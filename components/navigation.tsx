"use client"

import { motion } from "framer-motion"

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
  enterCursorArea: (text: string) => void
  leaveCursorArea: () => void
}

export default function Navigation({
  activeSection,
  setActiveSection,
  enterCursorArea,
  leaveCursorArea,
}: NavigationProps) {
  const navItems = [
    { id: "intro", label: "Intro" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "about", label: "About" },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-mono text-sm tracking-wider"
        onMouseEnter={() => enterCursorArea("Home")}
        onMouseLeave={leaveCursorArea}
        onClick={() => setActiveSection("intro")}
      >
        Portfolio
      </motion.div>

      <ul className="flex space-x-6">
        {navItems.map((item) => (
          <li key={item.id}>
            <motion.button
              className={`font-mono text-xs tracking-wider interactive-element ${
                activeSection === item.id ? "opacity-100" : "opacity-50"
              }`}
              onClick={() => setActiveSection(item.id)}
              onMouseEnter={() => enterCursorArea(item.label)}
              onMouseLeave={leaveCursorArea}
              whileHover={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeSection === item.id ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  className="h-px bg-white mt-1"
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
