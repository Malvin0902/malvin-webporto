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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm h-full w-full z-10"
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
                className="w-full max-w-[600px] my-8 flex flex-col bg-[rgba(20,20,20,0.95)] border border-gray-800/50 sm:rounded-xl overflow-hidden backdrop-blur-sm shadow-2xl"
                initial={{ opacity: 0.5, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div 
                  layoutId={`image-${active.title}-${id}`}
                  className="w-full h-72 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg bg-[rgba(15,15,15,1)] flex items-center justify-center text-4xl relative overflow-hidden"
                >
                  {active.icon}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                </motion.div>

                <div className="p-8">
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
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-base opacity-80 space-y-6 leading-relaxed"
                    >
                      {typeof active.content === "function" ? active.content() : active.content}
                    </motion.div>
                  </div>

                  {active.tags && active.tags.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-2 mt-8"
                    >
                      {active.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="skill-tag bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  )}

                  {active.ctaLink && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-8"
                    >
                      <a
                        href={active.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <span>{active.ctaText || 'View Project'}</span>
                        <span className="ml-2 inline-block transform group-hover:translate-x-1 transition-transform duration-300">
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
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="project-card p-6 interactive-element group cursor-pointer relative overflow-hidden"
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActive(card)
              }
            }}
          >
            <motion.div 
              layoutId={`image-${card.title}-${id}`} 
              className="mb-6 text-3xl relative"
            >
              {card.icon}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <motion.h3 
              layoutId={`title-${card.title}-${id}`} 
              className="text-xl font-semibold mb-3"
            >
              {card.title}
            </motion.h3>
            <motion.p 
              layoutId={`description-${card.description}-${id}`} 
              className="text-sm opacity-70 mb-4 line-clamp-2"
            >
              {card.description}
            </motion.p>
            <div className="flex flex-wrap">
              {card.tags &&
                card.tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    className="skill-tag mr-2 mb-2 bg-white/5 hover:bg-white/10 transition-colors"
                    whileHover={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      transition: { duration: 0.2 },
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
            </div>

            <motion.div 
              className="mt-4 text-sm opacity-0 group-hover:opacity-70 transition-all duration-300 flex items-center"
              initial={false}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <span>View details</span>
              <span className="ml-1 inline-block transform group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </motion.div>
          </motion.div>
        ))}
      </ul>
    </>
  )
}
