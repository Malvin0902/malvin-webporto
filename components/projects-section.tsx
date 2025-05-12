"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import ExpandableCard, { type CardProps } from "@/components/ui/expandable-card"

interface ProjectsSectionProps {
  setActiveSection: (section: string) => void
}

export default function ProjectsSection({ setActiveSection }: ProjectsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const projects: CardProps[] = [
    {
      title: "Editorial Design System",
      description: "A comprehensive design system for digital publications with a focus on typography and readability.",
      tags: ["Design System", "Typography", "UI/UX"],
      icon: "✓",
      src: "/placeholder.svg?height=400&width=400",
      ctaText: "",
      ctaLink: "",
      content: () => (
        <>
          <p>
            The Editorial Design System is a comprehensive framework designed to enhance digital publications through a
            focus on typography and readability. This project addresses the challenges of creating consistent, visually
            appealing, and highly readable digital content across multiple platforms.
          </p>
          <p>Key features of this design system include:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>A carefully curated typography scale optimized for digital reading</li>
            <li>Responsive layout components that maintain readability across devices</li>
            <li>Modular content blocks for flexible editorial layouts</li>
            <li>Accessibility-focused design elements ensuring content is available to all users</li>
            <li>Performance-optimized components for fast loading times</li>
          </ul>
          <p>
            The system was implemented using React and TypeScript, with a focus on component reusability and consistent
            styling through a custom Tailwind configuration.
          </p>
        </>
      ),
    },
    {
      title: "Interactive Storytelling Platform",
      description:
        "A web platform that enables authors to create interactive, branching narratives with rich media elements.",
      tags: ["Web Development", "Interactive", "React"],
      icon: "⬒",
      src: "/placeholder.svg?height=400&width=400",
      ctaText: "",
      ctaLink: "",
      content: () => (
        <>
          <p>
            The Interactive Storytelling Platform is a web-based tool that empowers authors to create engaging,
            non-linear narratives with branching storylines and multimedia elements. This project reimagines digital
            storytelling by combining traditional narrative techniques with interactive web technologies.
          </p>
          <p>The platform features:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>An intuitive visual editor for creating branching narrative paths</li>
            <li>Support for embedding images, audio, video, and interactive elements</li>
            <li>Real-time preview of story flow and reader experience</li>
            <li>Analytics dashboard to track reader engagement and choices</li>
            <li>Responsive design ensuring stories work across all devices</li>
          </ul>
          <p>
            Built with Next.js and a custom state management system, the platform prioritizes performance and
            accessibility while providing powerful creative tools for authors.
          </p>
        </>
      ),
    },
    {
      title: "Minimalist E-commerce",
      description: "A clean, typography-focused e-commerce experience for a boutique fashion brand.",
      tags: ["E-commerce", "Minimalist", "Next.js"],
      icon: "◉",
      src: "/placeholder.svg?height=400&width=400",
      ctaText: "",
      ctaLink: "",
      content: () => (
        <>
          <p>
            The Minimalist E-commerce project is a bespoke online shopping experience created for a boutique fashion
            brand. The design emphasizes typography and whitespace to create an elegant, distraction-free shopping
            environment that puts the focus on the products.
          </p>
          <p>Key aspects of this project include:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Typography-driven design with careful attention to hierarchy and readability</li>
            <li>Minimalist product displays with high-quality imagery</li>
            <li>Streamlined checkout process optimized for conversion</li>
            <li>Custom animations that enhance the browsing experience without distraction</li>
            <li>Integration with headless CMS for content management and Stripe for payments</li>
          </ul>
          <p>
            The site was built using Next.js with server components for optimal performance and SEO, while maintaining
            the minimalist aesthetic throughout the user journey.
          </p>
        </>
      ),
    },
  ]

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
        <h2 className="section-heading">Projects</h2>
        <p className="mb-12 opacity-80 max-w-2xl">
          A selection of my work. Each project represents a unique challenge and approach to creating meaningful digital
          experiences. Click on a project to learn more.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ExpandableCard cards={projects} />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 text-sm opacity-70 hover:opacity-100 interactive-element"
        onClick={() => setActiveSection("skills")}
        whileHover={{ x: 5, transition: { duration: 0.2 } }}
      >
        →view my skills
      </motion.button>
    </motion.div>
  )
}
