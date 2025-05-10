"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SkillsSectionProps {
  setActiveSection: (section: string) => void
}

export default function SkillsSection({ setActiveSection }: SkillsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const skills = [
    {
      category: "Design",
      items: [
        { name: "UI/UX Design", level: 90 },
        { name: "Typography", level: 95 },
        { name: "Editorial Design", level: 85 },
        { name: "Motion Design", level: 75 },
      ],
      icon: "⬒",
    },
    {
      category: "Development",
      items: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "CSS/Tailwind", level: 95 },
      ],
      icon: "◉",
    },
    {
      category: "Tools",
      items: [
        { name: "Figma", level: 90 },
        { name: "Design Systems", level: 85 },
        { name: "Git", level: 80 },
        { name: "Agile Methods", level: 75 },
      ],
      icon: "✓",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[80vh] max-w-4xl mx-auto"
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="section-heading">Skills</h2>
        <p className="mb-12 opacity-80 max-w-2xl">
          I specialize in creating minimal, typography-focused digital experiences that combine design principles with
          modern web technologies.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-12"
      >
        {skills.map((skillGroup, groupIndex) => (
          <motion.div key={skillGroup.category} variants={itemVariants}>
            <motion.div
              className="mb-4 text-3xl"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
            >
              {skillGroup.icon}
            </motion.div>
            <h3 className="text-xl mb-6">{skillGroup.category}</h3>

            <div className="space-y-6">
              {skillGroup.items.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="interactive-element"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">{skill.name}</span>
                    <span className="text-xs opacity-70">{skill.level}%</span>
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-bar-fill"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1.2, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12 text-sm opacity-70 hover:opacity-100 interactive-element"
        onClick={() => setActiveSection("about")}
        whileHover={{ x: 5, transition: { duration: 0.2 } }}
      >
        →more about me
      </motion.button>
    </motion.div>
  )
}
