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
      role: "Senior Designer & Developer",
      company: "Digital Studio",
      period: "2021 - Present",
      description: "Leading design and development for editorial and experimental web projects.",
    },
    {
      role: "UI/UX Designer",
      company: "Creative Agency",
      period: "2018 - 2021",
      description: "Designed user interfaces and experiences for various clients across different industries.",
    },
    {
      role: "Frontend Developer",
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
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        <motion.div variants={itemVariants}>
          <div className="mb-8 flex justify-center md:justify-start">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-800">
              <Image src="/placeholder.svg?height=200&width=200" alt="Profile picture" fill className="object-cover" />
            </div>
          </div>

          <p className="text-lg mb-6">
            I'm passionate about creating meaningful digital experiences that combine editorial design principles with
            modern web technologies.
          </p>
          <p className="opacity-80 mb-6">
            With a background in both design and development, I bridge the gap between aesthetics and functionality. My
            approach is minimalist and typography-focused, drawing inspiration from print design while embracing the
            interactive possibilities of digital media.
          </p>
          <p className="opacity-80 mb-8">
            I believe that great digital experiences start with a deep understanding of content and context. Whether
            designing a website, application, or digital publication, I focus on creating interfaces that communicate
            clearly and elegantly.
          </p>

          <div className="mt-8">
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
