"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

interface AboutSectionProps {
  setActiveSection: (section: string) => void
}

export default function AboutSection({ setActiveSection }: AboutSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const experiences = [
    {
      role: "Junior Full Stack Developer",
      company: "Digital Studio",
      period: "2021 - Present",
      description: "Developing full stack applications with focus on modern web technologies and best practices.",
    },
    {
      role: "Junior Full Stack Developer",
      company: "Creative Agency",
      period: "2018 - 2021",
      description: "Built and maintained web applications using modern JavaScript frameworks and backend technologies.",
    },
    {
      role: "Junior Full Stack Developer",
      company: "Tech Startup",
      period: "2016 - 2018",
      description: "Developed responsive and interactive web applications using modern JavaScript frameworks.",
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
        <h2 className="section-heading">About</h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24"
      >
        <motion.div variants={itemVariants} className="flex flex-col">
          <div className="mb-12">
            <div className="relative w-48 h-48 mx-auto md:mx-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full rounded-full overflow-hidden border border-gray-700"
              >
                <Image
                  src="/profile-photo.jpg"
                  alt="Profile photo"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-lg mb-6">
              I'm a junior full stack developer passionate about creating meaningful digital experiences. My work combines modern web technologies with clean, efficient code.
            </p>
            <div>
              <h3 className="text-lg mb-4">Connect</h3>
              <div className="flex space-x-4">
                {["Twitter", "LinkedIn", "GitHub", "Email"].map((platform, index) => (
                  <motion.a
                    key={platform}
                    href="#"
                    className="text-xs border border-gray-700 px-3 py-2 hover:bg-gray-900 transition-colors interactive-element"
                    whileHover={{
                      y: -3,
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      backgroundColor: "rgba(30, 30, 30, 1)",
                      transition: { duration: 0.2 },
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    {platform.toLowerCase()}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-lg mb-6">Experience</h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="timeline-item pl-6"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <h4 className="text-base">{exp.role}</h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm opacity-70">{exp.company}</span>
                  <span className="text-xs opacity-50">{exp.period}</span>
                </div>
                <p className="text-sm opacity-80">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12 text-sm opacity-70 hover:opacity-100 interactive-element"
        onClick={() => setActiveSection("intro")}
        whileHover={{ x: -5, transition: { duration: 0.2 } }}
      >
        ←back to intro
      </motion.button>
    </motion.div>
  )
}
