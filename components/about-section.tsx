"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Instagram, Mail, MessageSquareText } from "lucide-react"

interface AboutSectionProps {
  setActiveSection: (section: string) => void
}

interface SocialLink {
  name: string
  href: string
  icon: React.ReactNode
  text?: string
}

export default function AboutSection({ setActiveSection }: AboutSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const education = [
    {
      role: "Undergraduate Computer Science",
      company: "University of Indonesia",
      period: "2023 - Present",
      description: "Focusing on software engineering and web development. Active in tech communities and hackathons.",
    },
    
    {
      role: "High School Diploma",
      company: "SMA Alfa Centauri",
      period: "2020 - 2023",
      description: "Science major with focus on mathematics and computer science.",
    },
  ]

  const experiences = [
    {
      role: "Intern",
      company: "Tech Company",
      period: "Soon",
      description: "-",
    },
  ]

  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      href: "https://github.com/Malvin0902",
      icon: <Github size={16} />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/malvinmraqin/",
      icon: <Linkedin size={16} />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/mlvn.raqin/?hl=id",
      icon: <Instagram size={16} />,
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
        <motion.div variants={itemVariants} className="order-1 md:order-1">
          <div className="mb-8 flex justify-center md:justify-start">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-800">
              <Image 
                src="/profile-photo.jpg" 
                alt="Malvin's profile picture" 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </div>

          <p className="text-lg mb-6">
            I'm a junior full stack developer passionate about creating meaningful digital experiences. My work combines modern web technologies with clean, efficient code.
          </p>

          <div className="mt-12 space-y-8 md:block">
            <div>
              <h3 className="text-lg mb-4">Connect</h3>
              <div className="grid grid-cols-3 gap-3">
                {socialLinks.map((platform, index) => (
                  <motion.a
                    key={platform.name}
                    href={platform.href}
                    className="group flex items-center justify-center gap-2 text-xs border border-gray-300 dark:border-gray-700 px-3 py-2.5 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors interactive-element"
                    whileHover={{
                      y: -2,
                      borderColor: "rgba(var(--foreground), 0.5)",
                      backgroundColor: "rgba(var(--foreground), 0.1)",
                      transition: { duration: 0.2 },
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                      {platform.icon}
                    </span>
                    <span className="truncate">
                      {platform.text || platform.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <h3 className="text-lg mb-4">Contact Me</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <motion.a
                  href="mailto:malvinmraqin@gmail.com"
                  className="group flex items-center gap-2.5 text-sm border border-gray-300 dark:border-gray-700 px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors interactive-element"
                  whileHover={{
                    y: -2,
                    borderColor: "rgba(var(--foreground), 0.5)",
                    backgroundColor: "rgba(var(--foreground), 0.1)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <Mail size={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span className="truncate">malvinmraqin@gmail.com</span>
                </motion.a>

                <motion.a
                  href="#"
                  className="group flex items-center gap-2.5 text-sm border border-gray-300 dark:border-gray-700 px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors interactive-element"
                  whileHover={{
                    y: -2,
                    borderColor: "rgba(var(--foreground), 0.5)",
                    backgroundColor: "rgba(var(--foreground), 0.1)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <MessageSquareText size={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span className="truncate">@malv92</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-12 order-2 md:order-2">
          <div>
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
          </div>

          <div>
            <h3 className="text-lg mb-6">Education</h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="timeline-item pl-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <h4 className="text-base">{edu.role}</h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm opacity-70">{edu.company}</span>
                    <span className="text-xs opacity-50">{edu.period}</span>
                  </div>
                  <p className="text-sm opacity-80">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12 text-sm opacity-70 hover:opacity-100 interactive-element"
        onClick={() => setActiveSection("chat")}
        whileHover={{ x: 5, transition: { duration: 0.2 } }}
      >
        →chat with <span className="text-gradient">malvin_ai</span>
      </motion.button>
    </motion.div>
  )
}
