"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useChat } from 'ai/react'
import { Send, Bot, User } from 'lucide-react'

interface ChatSectionProps {
  setActiveSection: (section: string) => void
}

export default function ChatSection({ setActiveSection }: ChatSectionProps) {
  const ref = useRef(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  
  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])
  
  const suggestedQuestions = [
    "Apa saja proyek yang pernah dibuat Malvin?",
    "Teknologi apa yang dikuasai Malvin?",
    "Bagaimana cara menghubungi Malvin?",
    "Ceritakan tentang pengalaman pendidikan Malvin",
    "Apa itu proyek Goyang Lidah Jogja?",
    "Bisakah Malvin membantu proyek saya?"
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
        <h2 className="section-heading">chat with <span className="text-gradient">malvin_ai</span></h2>
        <p className="mb-12 opacity-80 max-w-2xl">
          Tanyakan apa saja tentang saya, proyek, atau keahlian saya.
        </p>
      </motion.div>
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="h-[500px] w-full max-w-3xl mx-auto border border-[rgba(var(--foreground),0.1)] rounded-lg shadow-md flex flex-col bg-white dark:bg-black">
          {/* Chat Messages Area */}          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-center h-full flex flex-col justify-center">
                <Bot size={32} className="mx-auto mb-4 opacity-50" />
                <p className="mb-2">Hai! Saya di sini untuk membantu Anda mengenal Malvin.</p>
                <p className="text-xs opacity-70 mb-4">Tanyakan tentang proyek, skills, atau pengalamannya!</p>
                <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const event = { target: { value: question } } as any;
                        handleInputChange(event);
                      }}
                      className="block w-full text-left text-xs p-2 bg-[rgba(var(--foreground),0.03)] hover:bg-[rgba(var(--foreground),0.05)] border border-[rgba(var(--foreground),0.1)] rounded transition-colors"
                    >
                      "{question}"
                    </button>
                  ))}
                </div>
              </div>
            )}
          
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    message.role === 'user' 
                      ? 'bg-[rgba(var(--foreground),0.8)] dark:bg-[rgba(var(--foreground),0.8)] text-[rgba(var(--background),1)] dark:text-[rgba(var(--background),1)]' 
                      : 'bg-[rgba(var(--foreground),0.1)] dark:bg-[rgba(var(--foreground),0.2)]'
                  }`}>
                    {message.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <div className={`px-3 py-2 rounded-lg text-sm ${
                    message.role === 'user'
                      ? 'bg-[rgba(var(--foreground),0.8)] dark:bg-[rgba(var(--foreground),0.8)] text-[rgba(var(--background),1)] dark:text-[rgba(var(--background),1)]'
                      : 'bg-[rgba(var(--foreground),0.05)] dark:bg-[rgba(var(--foreground),0.1)] border border-[rgba(var(--foreground),0.1)]'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
              {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-[rgba(var(--foreground),0.1)] dark:bg-[rgba(var(--foreground),0.2)] flex items-center justify-center">
                  <Bot size={12} />
                </div>
                <div className="bg-[rgba(var(--foreground),0.05)] dark:bg-[rgba(var(--foreground),0.1)] border border-[rgba(var(--foreground),0.1)] px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[rgba(var(--foreground),0.3)] dark:bg-[rgba(var(--foreground),0.5)] rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-[rgba(var(--foreground),0.3)] dark:bg-[rgba(var(--foreground),0.5)] rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-[rgba(var(--foreground),0.3)] dark:bg-[rgba(var(--foreground),0.5)] rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-[rgba(var(--foreground),0.1)] p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">            
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Tanyakan apa saja tentang Malvin..."
                className="flex-1 px-3 py-2 text-sm border border-[rgba(var(--foreground),0.1)] rounded-md bg-transparent focus:outline-none focus:ring-1 focus:ring-[rgba(var(--foreground),0.3)]"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-3 py-2 bg-[rgba(var(--foreground),0.8)] text-[rgba(var(--background),1)] rounded-md hover:bg-[rgba(var(--foreground),0.9)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </motion.div>      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 text-sm opacity-70 hover:opacity-100 interactive-element"
        onClick={() => setActiveSection("intro")}
        whileHover={{ x: -5, transition: { duration: 0.2 } }}
      >
        ←back to intro
      </motion.button>
    </motion.div>
  )
}
