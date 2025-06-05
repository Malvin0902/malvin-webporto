"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Greeting from "./greeting"

interface IntroSectionProps {
  setActiveSection: (section: string) => void
}

export default function IntroSection({ setActiveSection }: IntroSectionProps) {
  const [showButton, setShowButton] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [conversation, setConversation] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userResponse, setUserResponse] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [hasUserResponded, setHasUserResponded] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  const initialMessages = ["hi.", "i'm a junior software engineer", "would you like to know more about me?"]
  const responseOptions = [
    { text: "🚀 show me your projects", action: () => setActiveSection("projects") },
    { text: "🛠️ what are your skills?", action: () => setActiveSection("skills") },
    { text: "👋 tell me about yourself", action: () => setActiveSection("about") },
    { text: "💬 let's chat with AI", action: () => setActiveSection("chat") },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showChat && currentIndex < initialMessages.length) {
      setIsTyping(true)
      const timer = setTimeout(() => {
        setConversation((prev) => [...prev, initialMessages[currentIndex]])
        setCurrentIndex((prev) => prev + 1)
        setIsTyping(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [showChat, currentIndex, initialMessages.length])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [conversation, isTyping])
  const handleStartChat = () => {
    setShowChat(true)
  }

  const handleCustomResponse = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userResponse.trim()) return

    setConversation((prev) => [...prev, `you: ${userResponse}`])
    setUserResponse("")
    setIsTyping(true)
    setHasUserResponded(true) // Mark that user has responded

    setTimeout(() => {
      setIsTyping(false)
      setConversation((prev) => [...prev, "thanks for sharing! let me show you my projects."])
      setTimeout(() => {
        setActiveSection("projects")
      }, 2000)
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-[80vh] flex flex-col justify-center max-w-2xl mx-auto"
    >
      {!showChat ? (
        <>          <motion.div variants={itemVariants} className="mb-16">
            <h1 className="text-4xl sm:text-5xl mb-8 leading-tight">
              <Greeting />
              <br />
              i'm a <span className="text-gradient">
                <span className="hidden sm:inline">software engineer.</span>
                <span className="sm:hidden">SWE.</span>
              </span>
            </h1>
          </motion.div>

          {showButton && (
            <motion.button
              variants={itemVariants}
              className="button self-start"
              onClick={handleStartChat}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              →say hi
            </motion.button>
          )}
        </>
      ) : (
        <div ref={chatRef} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
          {conversation.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`${message.startsWith("you:") ? "text-right" : ""}`}
            >
              <span className={`inline-block p-3 ${message.startsWith("you:") ? "bg-[rgba(var(--foreground),0.1)] dark:bg-[rgba(var(--foreground),0.1)]" : ""}`}>{message}</span>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block p-3">
              <span className="typing-effect"></span>
            </motion.div>
          )}          {currentIndex === initialMessages.length && !isTyping && !hasUserResponded && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
              >              <div className="space-y-3">
                {responseOptions.map((option, index) => (
                  <button
                    key={index}
                    className="block p-3 text-sm hover:opacity-80 transition-opacity duration-200"
                    onClick={option.action}
                  >
                    {option.text}
                  </button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-6"
              >
                <p className="text-[rgba(var(--foreground),0.6)] text-xs mb-3">or tell me what's on your mind:</p>
                <form onSubmit={handleCustomResponse} className="flex gap-2">
                  <input
                    type="text"
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    className="flex-1 bg-transparent border border-[rgba(var(--foreground),0.1)] px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-[rgba(var(--foreground),0.3)] focus:border-[rgba(var(--foreground),0.3)] transition-colors"
                    placeholder="type your message..."
                  />
                  <motion.button
                    type="submit"
                    className="bg-[rgba(var(--foreground),0.8)] text-[rgba(var(--background),1)] px-4 py-2 text-sm rounded-md hover:bg-[rgba(var(--foreground),0.9)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!userResponse.trim()}
                  >
                    send
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  )
}
