"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface IntroSectionProps {
  setActiveSection: (section: string) => void
}

const profile = {
  name: "Your Name",
  title: "Designer & Developer",
  image: "/profile.jpg", // Place your image in the public folder
  bio: "I'm passionate about creating meaningful digital experiences that combine editorial design principles with modern web technologies.",
}

export default function IntroSection({ setActiveSection }: IntroSectionProps) {
  const [showButton, setShowButton] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [conversation, setConversation] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userResponse, setUserResponse] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const [greeting, setGreeting] = useState("hi.")
  const [isGreetingAnimating, setIsGreetingAnimating] = useState(false)
  const [showDeveloper, setShowDeveloper] = useState(false)

  const initialMessages = [
    "hi",
    "i'm a designer & developer.",
    "my passion is creating minimal, text-based experiences at the intersection of design and technology.",
    "would you like to know more about me?",
  ]

  const responseOptions = [
    { text: "show me your projects", action: () => setActiveSection("projects") },
    { text: "what are your skills?", action: () => setActiveSection("skills") },
    { text: "tell me about yourself", action: () => setActiveSection("about") },
  ]

  const greetings = [
    "hi.",
    "bonjour.",
    "hola.",
    "こんにちは.",
    "你好.",
    "안녕하세요.",
    "ciao.",
    "hallo.",
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

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      setIsGreetingAnimating(true)
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % greetings.length
        setGreeting(greetings[currentIndex])
        setIsGreetingAnimating(false)
      }, 800)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (showChat) {
      const timer = setTimeout(() => {
        setShowDeveloper(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showChat])

  const handleStartChat = () => {
    setShowChat(true)
    setConversation([initialMessages[0]])
    setCurrentIndex(1)
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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        type: "spring",
        stiffness: 100
      } 
    },
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
              <motion.span
                className="text-gradient"
                animate={{ 
                  opacity: isGreetingAnimating ? 0 : 1,
                  scale: isGreetingAnimating ? 0.95 : 1
                }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {greeting}
              </motion.span>
            </h1>
            <motion.p 
              className="text-lg opacity-80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.3,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              i'm a designer & developer.
            </motion.p>
          </motion.div>

          {showButton && (
            <motion.button
              className="button interactive-element self-start"
              onClick={handleStartChat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                y: -3,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
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
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.1
              }}
              className={`${message.startsWith("you:") ? "text-right" : ""}`}
            >
              <motion.span 
                className={`inline-block p-3 ${message.startsWith("you:") ? "bg-gray-900" : ""}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {message}
              </motion.span>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="inline-block p-3"
              transition={{ duration: 0.3 }}
            >
              <span className="typing-effect"></span>
            </motion.div>
          )}

          {currentIndex === initialMessages.length && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <div className="space-y-3">
                {responseOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    className="interactive-element block text-left p-3 w-full hover:bg-gray-900 transition-colors"
                    onClick={option.action}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.4,
                      delay: 0.1 * index,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    whileHover={{ 
                      x: 5,
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {option.text}
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6"
              >
                <p className="text-gray-500 text-xs mb-2">or type your own response:</p>
                <form onSubmit={handleCustomResponse} className="flex">
                  <motion.input
                    type="text"
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    className="flex-1 bg-transparent border border-gray-800 p-2 text-sm focus:outline-none focus:border-gray-600 interactive-element"
                    placeholder="type your message..."
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.button
                    type="submit"
                    className="bg-gray-900 px-4 text-sm hover:bg-gray-800 transition-colors interactive-element"
                    whileHover={{ 
                      backgroundColor: "rgba(40, 40, 40, 1)",
                      scale: 1.02
                    }}
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
