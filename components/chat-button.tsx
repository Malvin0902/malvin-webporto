// components/chat-button.tsx
"use client"

import { MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'

interface ChatButtonProps {
  onClick: () => void
}

export default function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-4 right-4 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center z-40 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 1 }}
    >
      <MessageSquare size={24} />
        {/* Notification pulse */}
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 3, delay: 2 }}
      >
        <span className="text-xs text-white flex items-center justify-center w-full h-full font-mono">?</span>
      </motion.div>
    </motion.button>
  )
}