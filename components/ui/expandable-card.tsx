"use client"

import type React from "react"
import { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { X } from "lucide-react"

export interface CardProps {
  title: string
  description: string
  src: string
  ctaText: string
  ctaLink: string
  content: React.ReactNode | (() => React.ReactNode)
  icon?: string
  tags?: string[]
}

interface ExpandableCardProps {
  cards: CardProps[]
}

export default function ExpandableCard({ cards }: ExpandableCardProps) {
  const [active, setActive] = useState<CardProps | boolean | null>(null)
  const ref = useRef<HTMLDivElement>(null!)
  const id = useId()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false)
      }
    }

    // Only prevent body scrolling, not content scrolling
    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [active])

  useOutsideClick(ref, () => setActive(null))

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm h-full w-full z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`dialog-title-${id}`}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div 
            className="fixed inset-0 z-[100] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="min-h-full flex items-center justify-center p-4">
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[600px] my-8 flex flex-col bg-white/95 dark:bg-[rgba(20,20,20,0.95)] border border-gray-200/50 dark:border-gray-800/50 sm:rounded-xl overflow-hidden backdrop-blur-sm shadow-2xl relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ 
                  transform: "translateZ(0)",
                  backfaceVisibility: "visible",
                  perspective: "none",
                  willChange: "auto"
                }}
              >
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-100/50 dark:bg-white/5 hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors z-10"
                  aria-label="Close"
                >
                  <X size={18} className="opacity-70" />
                </button>

                <motion.div 
                  layoutId={`image-${active.title}-${id}`}
                  className="w-full h-72 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg bg-gray-100 dark:bg-[rgba(15,15,15,1)] flex items-center justify-center text-4xl relative overflow-hidden"
                >
                  {active.icon}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 dark:to-black/20" />
                </motion.div>

                <div className="p-6">
                  <motion.h3 
                    layoutId={`title-${active.title}-${id}`} 
                    className="text-2xl font-semibold mb-4"
                    id={`dialog-title-${id}`}
                  >
                    {active.title}
                  </motion.h3>
                  <motion.p 
                    layoutId={`description-${active.description}-${id}`} 
                    className="text-base opacity-80 mb-8 leading-relaxed"
                  >
                    {active.description}
                  </motion.p>

                  <div className="overflow-y-auto max-h-[40vh] pr-4 custom-scrollbar">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="text-base opacity-80 space-y-6 leading-relaxed"
                    >
                      {typeof active.content === "function" ? active.content() : active.content}
                    </motion.div>
                  </div>

                  {active.tags && active.tags.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-wrap gap-2 mt-8"
                    >
                      {active.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="skill-tag bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  )}

                  {active.ctaLink && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="mt-8"
                    >
                      <a
                        href={active.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <span>{active.ctaText || 'View Project'}</span>
                        <span className="ml-2 inline-block transition-transform duration-200">
                          →
                        </span>
                      </a>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="project-card group relative overflow-hidden"
            onClick={() => setActive(card)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            whileHover={{ opacity: 0.9 }}
            style={{ 
              transform: "translateZ(0)",
              backfaceVisibility: "visible",
              perspective: "none",
              willChange: "auto"
            }}
          >
            <div className="p-6">
              <div className="mb-4 text-3xl">{card.icon}</div>
              <h3 className="text-xl mb-2">{card.title}</h3>
              <p className="text-sm opacity-70 mb-4">{card.description}</p>

              <div className="flex flex-wrap">
                {card.tags &&
                  card.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      className="skill-tag mr-2 mb-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                      whileHover={{ opacity: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
              </div>

              <motion.div 
                className="mt-4 text-sm opacity-0 group-hover:opacity-70 transition-all duration-200 flex items-center"
                initial={false}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <span>View details</span>
                <span className="ml-1 inline-block transition-transform duration-200">
                  →
                </span>
              </motion.div>

              <motion.div
                className="absolute bottom-4 right-4 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <span className="inline-block">
                  Click me
                </span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  )
}
