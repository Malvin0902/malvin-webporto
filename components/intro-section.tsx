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
  const chatRef = useRef<HTMLDivElement>(null)

  const initialMessages = ["hi.", "i'm a junior full stack developer", "would you like to know more about me?"]

  const responseOptions = [
    { text: "show me your projects", action: () => setActiveSection("projects") },
    { text: "what are your skills?", action: () => setActiveSection("skills") },
    { text: "tell me about yourself", action: () => setActiveSection("about") },
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

    setTimeout(() => {
      setIsTyping(false)
      setConversation((prev) => [...prev, "i appreciate your message. let me show you around my portfolio."])
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
        <>
          <motion.div variants={itemVariants} className="mb-16">
            <h1 className="text-5xl mb-8 leading-tight">
              <Greeting />
              <br />
              i'm a
              <br />
              <span className="text-gradient">developer.</span>
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
              <span className={`inline-block p-3 ${message.startsWith("you:") ? "bg-gray-200 dark:bg-gray-900" : ""}`}>{message}</span>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block p-3">
              <span className="typing-effect"></span>
            </motion.div>
          )}

          {currentIndex === initialMessages.length && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <div className="space-y-3">
                {responseOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    className="block text-left p-3 w-full hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors"
                    onClick={option.action}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{ x: 5 }}
                  >
                    {option.text}
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-6"
              >
                <p className="text-gray-500 text-xs mb-2">or type your own response:</p>
                <form onSubmit={handleCustomResponse} className="flex">
                  <input
                    type="text"
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    className="flex-1 bg-transparent border border-gray-800 p-2 text-sm focus:outline-none focus:border-gray-600"
                    placeholder="type your message..."
                  />
                  <motion.button
                    type="submit"
                    className="bg-gray-200 dark:bg-gray-900 px-4 text-sm hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors"
                    whileHover={{ backgroundColor: "rgba(229, 231, 235, 1)" }}
                    whileTap={{ scale: 0.98 }}
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
