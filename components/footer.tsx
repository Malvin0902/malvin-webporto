"use client"

import { motion } from "framer-motion"

interface FooterProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Footer({ activeSection, setActiveSection }: FooterProps) {
  const navItems = [
    { id: "intro", label: "intro" },
    { id: "projects", label: "projects" },
    { id: "skills", label: "skills" },
    { id: "about", label: "about" },
  ]

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mt-24 py-6 flex justify-between items-center text-xs opacity-50"
    >
      <div className="flex space-x-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`interactive-element ${activeSection === item.id ? "opacity-100" : "opacity-70"}`}
            onClick={() => setActiveSection(item.id)}
          >
            {item.label}
            {activeSection === item.id && (
              <motion.div
                className="h-px bg-white mt-1"
                layoutId="activeSection"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      <div>made with ♥ in 2023</div>
    </motion.footer>
  )
}
