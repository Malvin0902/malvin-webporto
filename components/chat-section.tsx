"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useChat } from 'ai/react'
import { Send, Bot, User } from 'lucide-react'

interface ChatSectionProps {
  setActiveSection: (section: string) => void
}

export default function ChatSection({ setActiveSection }: ChatSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  
  const suggestedQuestions = [
    "Apa saja proyek yang pernah dibuat Malvin?",
    "Teknologi apa yang dikuasai Malvin?",
    "Bagaimana cara menghubungi Malvin?",
    "Ceritakan tentang pengalaman pendidikan Malvin",
    "Apa itu proyek Goyang Lidah Jogja?",
    "Bisakah Malvin membantu proyek saya?"
  ]

  return (
    <div ref={ref} className="min-h-[80vh] flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-mono mb-4">chat</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Tanyakan apa saja tentang saya, proyek, atau keahlian saya.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="h-[500px] w-full max-w-3xl mx-auto border border-gray-200 dark:border-gray-800 rounded-lg shadow-md flex flex-col bg-white/50 dark:bg-black/50 backdrop-blur-sm"
      >
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm h-full flex flex-col justify-center">
              <Bot size={32} className="mx-auto mb-2 opacity-50" />
              <p>Hai! Saya di sini untuk membantu Anda mengenal Malvin.</p>
              <p className="text-xs mt-1">Tanyakan tentang proyek, skills, atau pengalamannya!</p>
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const event = { target: { value: question } } as any;
                      handleInputChange(event);
                    }}
                    className="block w-full text-left text-xs p-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
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
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  {message.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                </div>
                <div className={`px-3 py-2 rounded-lg text-sm ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
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
              <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <Bot size={12} />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Tanyakan apa saja tentang Malvin..."
              className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
