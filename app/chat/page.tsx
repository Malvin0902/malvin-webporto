"use client"

import { useState } from "react"
import { useChat } from 'ai/react'
import { Send, Bot, User } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from "@/components/navbar"
import DotBackground from "@/components/ui/dot-background"

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [activeSection, setActiveSection] = useState("chat")
  
  const suggestedQuestions = [
    "Apa saja proyek yang pernah dibuat Malvin?",
    "Teknologi apa yang dikuasai Malvin?",
    "Bagaimana cara menghubungi Malvin?",
    "Ceritakan tentang pengalaman pendidikan Malvin",
    "Apa itu proyek Goyang Lidah Jogja?",
    "Bisakah Malvin membantu proyek saya?"
  ]

  return (
    <DotBackground className="min-h-screen">
      {/* Navbar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      <div className="container mx-auto px-4 pt-28 pb-16 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Chat header */}
          <div className="mb-8">
            <h1 className="text-4xl font-mono mb-2">chat with <span className="text-gradient">malvin_ai</span></h1>
            <p className="text-sm opacity-70">
              Tanyakan tentang proyek, skills, atau pengalaman Malvin
            </p>
          </div>
          
          {/* Chat interface */}
          <div className="border border-[rgba(var(--accent-color),0.2)] rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm">
            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center h-full flex flex-col justify-center">
                  <Bot size={32} className="mx-auto mb-4 opacity-50" />
                  <p className="mb-6">Hai! Saya di sini untuk membantu Anda mengenal Malvin.</p>
                  
                  <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const event = { target: { value: question } } as any;
                          handleInputChange(event);
                        }}
                        className="text-left text-xs p-2 bg-[rgba(var(--accent-color),0.05)] hover:bg-[rgba(var(--accent-color),0.1)] border border-[rgba(var(--accent-color),0.1)] rounded transition-colors"
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
                        ? 'bg-[rgba(var(--accent-color),1)]' 
                        : 'bg-[rgba(var(--accent-color),0.1)]'
                    }`}>
                      {message.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={`px-3 py-2 rounded-lg text-sm ${
                      message.role === 'user'
                        ? 'bg-[rgba(var(--accent-color),1)] text-white'
                        : 'bg-[rgba(var(--accent-color),0.05)] border border-[rgba(var(--accent-color),0.1)]'
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
                  <div className="w-6 h-6 rounded-full bg-[rgba(var(--accent-color),0.1)] flex items-center justify-center">
                    <Bot size={12} />
                  </div>
                  <div className="bg-[rgba(var(--accent-color),0.05)] border border-[rgba(var(--accent-color),0.1)] px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[rgba(var(--accent-color),0.4)] rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-[rgba(var(--accent-color),0.4)] rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-[rgba(var(--accent-color),0.4)] rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-[rgba(var(--accent-color),0.1)] p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Tanyakan sesuatu tentang Malvin..."
                  className="flex-1 px-3 py-2 text-sm border border-[rgba(var(--accent-color),0.2)] rounded-md bg-transparent focus:outline-none focus:ring-1 focus:ring-[rgba(var(--accent-color),0.5)]"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-3 py-2 bg-[rgba(var(--accent-color),1)] text-white rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DotBackground>
  )
}
