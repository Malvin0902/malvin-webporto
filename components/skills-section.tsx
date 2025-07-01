"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SkillsSectionProps {
  setActiveSection: (section: string) => void
}

export default function SkillsSection({ setActiveSection }: SkillsSectionProps) {
  const ref = useRef(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [typedCommand, setTypedCommand] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([
    "Welcome to Skills Terminal v1.0.0",
    "Type 'help' to see available commands.",
    ""
  ])
  const [isExecuting, setIsExecuting] = useState(false)

  const allSkills = {
    languages: ["JavaScript", "TypeScript", "HTML", "CSS", "Python", "SQL"],
    frameworks: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "Framer Motion"],
    tools: ["Git", "GitHub", "VS Code", "Figma", "Vercel", "AWS"],
    design: ["UI/UX", "Responsive Design", "Typography", "Animation", "Wireframing", "Prototyping"],
  }

  const categories = [
    { id: "all", label: "All" },
    { id: "languages", label: "Languages" },
    { id: "frameworks", label: "Frameworks" },
    { id: "tools", label: "Tools" },
    { id: "design", label: "Design" },
  ]
  // Auto scroll to bottom whenever command history changes
  useEffect(() => {
    if (terminalRef.current) {
      setTimeout(() => {
        terminalRef.current?.scrollTo({
          top: terminalRef.current.scrollHeight,
          behavior: 'smooth'
        })
      }, 200)
    }
  }, [commandHistory])

  // Focus input when component mounts or after command execution
  useEffect(() => {
    if (inputRef.current && !isExecuting) {
      inputRef.current.focus()
    }
  }, [commandHistory, isExecuting])

  const addToHistory = (lines: string[]) => {
    setCommandHistory(prev => [...prev, ...lines])
  }

  const renderSkillsInTerminal = (category: string) => {
    let skills: string[] = []
    let categoryName = ""

    if (category === "all") {
      // For "all", we'll show a summary
      const totalSkills = Object.values(allSkills).flat().length
      return [
        `Found ${totalSkills} skills across ${Object.keys(allSkills).length} categories:`,
        "",
        ...Object.entries(allSkills).map(([cat, skillList]) => 
          `${cat.padEnd(12)} (${skillList.length}) ${skillList.slice(0, 3).join(", ")}${skillList.length > 3 ? "..." : ""}`
        ),
        "",
        "Use 'ls <category>' to see specific skills."
      ]
    } else if (allSkills[category as keyof typeof allSkills]) {
      skills = allSkills[category as keyof typeof allSkills]
      categoryName = category
      return [
        `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}:`,
        "",
        ...skills.map((skill, index) => `${(index + 1).toString().padStart(2)}. ${skill}`),
        ""
      ]
    }

    return []
  }

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const command = typedCommand.trim()
    if (!command) return

    setIsExecuting(true)
    
    // Add the command to history first
    addToHistory([`$ ${command}`])
      // Clear the input
    setTypedCommand("")

    // Small delay to simulate command execution with smoother timing
    await new Promise(resolve => setTimeout(resolve, 300))

    const lowerCommand = command.toLowerCase()
    let response: string[] = []

    if (lowerCommand === "help") {
      response = [
        "Available commands:",
        "",
        "  ls skills              - List all skills",
        "  ls languages          - List programming languages  ",
        "  ls frameworks         - List frameworks & libraries",
        "  ls tools              - List development tools",
        "  ls design             - List design skills",
        "  clear                 - Clear terminal",
        "  cd about              - Navigate to about section",
        "  pwd                   - Show current section",
        ""
      ]
    } else if (lowerCommand === "ls skills" || lowerCommand === "ls") {
      setActiveCategory("all")
      response = renderSkillsInTerminal("all")
    } else if (lowerCommand === "ls languages") {
      setActiveCategory("languages")
      response = renderSkillsInTerminal("languages")
    } else if (lowerCommand === "ls frameworks") {
      setActiveCategory("frameworks")
      response = renderSkillsInTerminal("frameworks")
    } else if (lowerCommand === "ls tools") {
      setActiveCategory("tools")
      response = renderSkillsInTerminal("tools")
    } else if (lowerCommand === "ls design") {
      setActiveCategory("design")
      response = renderSkillsInTerminal("design")
    } else if (lowerCommand === "clear") {
      setCommandHistory([])
      setIsExecuting(false)
      return    } else if (lowerCommand === "cd about") {
      response = ["Navigating to about section..."]
      addToHistory(response)
      setTimeout(() => setActiveSection("about"), 1500)
      setIsExecuting(false)
      return
    } else if (lowerCommand === "pwd") {
      response = ["/home/malvin/portfolio/skills"]
    } else {
      response = [`Error: '${command}' is not recognized. Type 'help' for available commands.`]
    }

    // Add response to history
    addToHistory(response)
    setIsExecuting(false)
  }

  const handleQuickCommand = async (commandType: string) => {
    const commands = {
      all: "ls skills",
      languages: "ls languages",
      frameworks: "ls frameworks", 
      tools: "ls tools",
      design: "ls design",
      clear: "clear"
    }

    const command = commands[commandType as keyof typeof commands]
    if (!command) return

    setIsExecuting(true)
      // Add the command to history
    addToHistory([`$ ${command}`])

    // Small delay to simulate command execution with smoother timing
    await new Promise(resolve => setTimeout(resolve, 300))

    if (command === "clear") {
      setCommandHistory([])
      setIsExecuting(false)
      return
    }

    // Execute the command logic
    if (commandType === "all") {
      setActiveCategory("all")
      addToHistory(renderSkillsInTerminal("all"))
    } else if (["languages", "frameworks", "tools", "design"].includes(commandType)) {
      setActiveCategory(commandType)
      addToHistory(renderSkillsInTerminal(commandType))
    }

    setIsExecuting(false)
  }

  const displaySkills = () => {
    if (activeCategory === "all") {
      return Object.entries(allSkills).map(([category, skills]) => (
        <div key={category} className="mb-6">
          <div className="text-sm opacity-30 mb-2 font-mono">{`// ${category.charAt(0).toUpperCase() + category.slice(1)}`}</div>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="font-mono text-sm"
              >
                <span className="opacity-40">const</span> {skill.toLowerCase().replace(/[^a-z0-9]/gi, "")}{" "}
                <span className="opacity-30">=</span> <span className="opacity-60">true</span>;
              </motion.div>
            ))}
          </div>
        </div>
      ))
    } else {
      const skills = allSkills[activeCategory as keyof typeof allSkills] || []
      return (
        <div className="mb-6">
          <div className="text-sm opacity-50 mb-2 font-mono">{`// ${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`}</div>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="font-mono text-sm"
              >
                <span className="opacity-40">const</span> {skill.toLowerCase().replace(/[^a-z0-9]/gi, "")}{" "}
                <span className="opacity-30">=</span> <span className="opacity-60">true</span>;
              </motion.div>
            ))}
          </div>
        </div>
      )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[80vh] max-w-4xl mx-auto"
      ref={ref}
    >
      <h2 className="text-4xl mb-6 font-mono">Skills</h2>
      <p className="mb-8 text-lg max-w-2xl opacity-80">
        I specialize in creating minimal, typography-focused digital experiences using modern web technologies.
      </p>

      {/* Terminal Window */}
      <div className="border border-[rgba(var(--foreground),0.1)] rounded-lg overflow-hidden bg-[rgba(var(--background),0.95)] mb-12">
        {/* Terminal Header */}
        <div className="bg-[rgba(var(--foreground),0.03)] px-4 py-2 flex items-center border-b border-[rgba(var(--foreground),0.08)]">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="mx-auto text-xs opacity-40 font-mono text-[rgba(var(--foreground),0.4)]">skills.terminal</div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="p-4 font-mono text-sm h-[400px] overflow-y-auto custom-scrollbar text-[rgba(var(--foreground),0.7)]"
          onClick={() => inputRef.current?.focus()}
        >          {/* Command History */}
          <div className="space-y-1">
            {commandHistory.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`${
                  line.startsWith("$") 
                    ? "text-green-400" 
                    : line.startsWith("Error") 
                    ? "text-red-400" 
                    : "opacity-70"
                }`}
              >
                {line}
              </motion.div>
            ))}
          </div>

          {/* Current Command Input - Always at the bottom */}
          <form onSubmit={handleCommand} className="flex items-center mt-2">
            <span className="opacity-40 mr-2 text-green-400">{"$ "}</span>
            <input
              ref={inputRef}
              type="text"
              value={typedCommand}
              onChange={(e) => setTypedCommand(e.target.value)}
              className="flex-1 bg-transparent outline-none font-mono placeholder:opacity-30"
              placeholder="Type 'help' for commands..."
              disabled={isExecuting}
            />            {isExecuting && (
              <motion.span 
                className="ml-2 opacity-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                executing...
              </motion.span>
            )}
          </form>
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleQuickCommand(category.id)}
            disabled={isExecuting}
            className={`px-3 py-1 text-xs font-mono rounded-md transition-colors border disabled:opacity-50 ${
              activeCategory === category.id
                ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                : "bg-transparent border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
            }`}
          >
            {category.id === "all" ? "ls skills" : `ls ${category.id}`}
          </button>
        ))}
        <button
          onClick={() => handleQuickCommand("clear")}
          disabled={isExecuting}
          className="px-3 py-1 text-xs font-mono rounded-md bg-transparent border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors disabled:opacity-50"
        >
          clear
        </button>
      </div>      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.button
          className="text-sm opacity-70 hover:opacity-100 transition-opacity group flex items-center space-x-2"
          onClick={() => setActiveSection("about")}
          whileHover={{ x: 5 }}
        >
          <span>cd about</span>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}