"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { AlertCircle, XCircle, Shield, Grid, Plane, Zap, Circle, Clock, Monitor } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import CustomNavbar from "./custom-navbar"

interface WithoutSimbianProps {
  onSwitchView: () => void
}

// Define alert icon types
type IconType = "grid" | "plane" | "zap" | "circle"

// Define alert item interface
interface AlertItem {
  id: string
  icon: IconType
}

// Define notification type
type NotificationType = "waiting" | "chatgpt" | "query" | null

export default function WithoutSimbian({ onSwitchView }: WithoutSimbianProps) {
  // Alert counts
  const [ignoredAlerts, setIgnoredAlerts] = useState(193)
  const [wronglyClosed, setWronglyClosed] = useState(23)
  const [activeThreats, setActiveThreats] = useState(1)

  // Alert items in each card
  const [ignoredItems, setIgnoredItems] = useState<AlertItem[]>([])
  const [wronglyItems, setWronglyItems] = useState<AlertItem[]>([])
  const [activeItems, setActiveItems] = useState<AlertItem[]>([])

  // Current notification shown on the left
  const [notification, setNotification] = useState<NotificationType>("waiting")

  // Refs for the cards
  const ignoredRef = useRef<HTMLDivElement>(null)
  const wronglyRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLDivElement>(null)

  // Initialize alert items
  useEffect(() => {
    // Generate random icons for ignored alerts
    const ignoredIcons: AlertItem[] = Array(8)
      .fill(0)
      .map((_, i) => ({
        id: `ignored-${i}`,
        icon: ["grid", "plane", "zap", "circle"][Math.floor(Math.random() * 4)] as IconType,
      }))

    // Generate random icons for wrongly closed
    const wronglyIcons: AlertItem[] = Array(8)
      .fill(0)
      .map((_, i) => ({
        id: `wrongly-${i}`,
        icon: ["grid", "plane", "zap", "circle"][Math.floor(Math.random() * 4)] as IconType,
      }))

    // Generate random icons for active threats
    const activeIcons: AlertItem[] = Array(1)
      .fill(0)
      .map((_, i) => ({
        id: `active-${i}`,
        icon: ["grid"][Math.floor(Math.random() * 1)] as IconType,
      }))

    setIgnoredItems(ignoredIcons)
    setWronglyItems(wronglyIcons)
    setActiveItems(activeIcons)
  }, [])

  // Cycle through notifications
  useEffect(() => {
    const notifications: NotificationType[] = ["waiting", "chatgpt", "query"]
    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % notifications.length
      setNotification(notifications[currentIndex])
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, item: AlertItem, source: "ignored" | "wrongly") => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ id: item.id, icon: item.icon, source }))

    // Create a custom drag image
    const dragImage = document.createElement("div")
    dragImage.className = "bg-white rounded-md p-1 opacity-80"
    dragImage.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>`
    document.body.appendChild(dragImage)
    e.dataTransfer.setDragImage(dragImage, 10, 10)

    setTimeout(() => {
      document.body.removeChild(dragImage)
    }, 0)
  }

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (activeRef.current) {
      activeRef.current.classList.add("border-red-500", "border-2")
    }
  }

  // Handle drag leave
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    if (activeRef.current) {
      activeRef.current.classList.remove("border-red-500", "border-2")
    }
  }

  // Handle drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()

    if (activeRef.current) {
      activeRef.current.classList.remove("border-red-500", "border-2")
    }

    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"))
      const { id, icon, source } = data

      // Remove from source
      if (source === "ignored") {
        setIgnoredItems((prev) => prev.filter((i) => i.id !== id))
        setIgnoredAlerts((prev) => prev - 1)
      } else if (source === "wrongly") {
        setWronglyItems((prev) => prev.filter((i) => i.id !== id))
        setWronglyClosed((prev) => prev - 1)
      }

      // Add to active threats
      const newItem = { id: `active-new-${Date.now()}`, icon }
      setActiveItems((prev) => [...prev, newItem])
      setActiveThreats((prev) => prev + 1)
    } catch (error) {
      console.error("Error parsing drag data:", error)
    }
  }

  // Render icon component based on type
  const renderIcon = (type: IconType) => {
    switch (type) {
      case "grid":
        return <Grid className="h-4 w-4 text-white" />
      case "plane":
        return <Plane className="h-4 w-4 text-white" />
      case "zap":
        return <Zap className="h-4 w-4 text-white" />
      case "circle":
        return <Circle className="h-4 w-4 text-white" />
      default:
        return <Grid className="h-4 w-4 text-white" />
    }
  }

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden  bg-opacity-90 bg-blend-overlay bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/SimbianAI.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      <div className="h-16">
        <CustomNavbar variant="without" onSwitchView={onSwitchView} />
      </div>

      <div className="flex flex-col justify-between md:flex-row min-h-[calc(100vh-4rem)] w-full max-w-full mx-auto px-4 pt-4 md:pt-8 pb-8 ">
        {/* Left side - Problems and Notifications */}
        <div className="w-full md:w-2/5 flex flex-col justify-start md:justify-center space-y-3 px-4 md:px-16 pr-0 md:pr-4"  >
          <AnimatePresence mode="wait">
            {notification === "waiting" && (
              <motion.div
                key="waiting"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-[#1a2747]/80 rounded-lg p-2.5 shadow-lg w-full"
              >
                <div className="flex items-start">
                  <div className="bg-[#1a2747] p-2 rounded-full mr-3 flex-shrink-0">
                    <Clock className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm">Waiting for Analyst</h3>
                    <p className="text-gray-400 text-xs">Analyst is dealing with other problems, hold on...</p>
                  </div>
                </div>
              </motion.div>
            )}

            {notification === "query" && (
              <motion.div
                key="query"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-[#1a2747]/80 rounded-lg p-2.5 shadow-lg w-full"
              >
                <div className="flex items-start">
                  <div className="bg-[#1a2747] p-2 rounded-full mr-3 flex-shrink-0">
                    <Zap className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm">Writing Query</h3>
                    <p className="text-gray-400 text-xs">Querying across so many tools gets complex...</p>
                  </div>
                </div>
              </motion.div>
            )}

            {notification === "chatgpt" && (
              <motion.div
                key="chatgpt"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-[#1a2747]/80 rounded-lg p-2.5 shadow-lg w-full"
              >
                <div className="flex items-start">
                  <div className="bg-[#1a2747] p-2 rounded-full mr-3 flex-shrink-0">
                    <Circle className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm">Asking ChatGPT</h3>
                    <p className="text-gray-400 text-xs">What does this PowerShell command even mean?</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1a2747]/80 rounded-lg p-2.5 shadow-lg w-full"
          >
            <div className="flex items-start">
              <div className="bg-[#1a2747] p-2 rounded-full mr-3 flex-shrink-0">
                <Circle className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <p className="text-white text-sm">Wasting valuable analyst time on false positives</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#1a2747]/80 rounded-lg p-2.5 shadow-lg w-full"
          >
            <div className="flex items-start">
              <div className="bg-[#1a2747] p-2 rounded-full mr-3 flex-shrink-0">
                <Monitor className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <p className="text-white text-sm">Processing one alert at a time, missing the big picture</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#1a2747]/80 rounded-lg p-2.5 shadow-lg w-full"
          >
            <div className="flex items-start">
              <div className="bg-[#1a2747] p-2 rounded-full mr-3 flex-shrink-0">
                <Clock className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <p className="text-white text-sm">More time fixing SOAR automation, less time on real threats</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center - Side menu */}
        <div className="hidden md:flex flex-col items-center justify-center space-y-4 absolute left-1/2 transform -translate-x-1/2 mt-12">
          <div className="bg-white p-2 rounded-md shadow-md">
            <Grid className="h-4 w-4 text-[#1a4cff]" />
          </div>
          <div className="bg-white p-2 rounded-md shadow-md">
            <Plane className="h-4 w-4 text-[#1a4cff]" />
          </div>
          <div className="bg-white p-2 rounded-md shadow-md">
            <Zap className="h-4 w-4 text-[#1a4cff]" />
          </div>
          <motion.div className="bg-white p-2 rounded-md shadow-md relative" whileHover={{ scale: 1.1 }}>
            <Circle className="h-4 w-4 text-[#1a4cff]" />

            {/* Horizontal line to first timeline step */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 h-[40vh] hidden md:flex flex-col items-center mt-8">
              {/* Vertical fading line - white with fade effects */}
              <div className="relative h-full w-px">
                <div
                  className="h-full w-full bg-white"
                  style={{
                    maskImage: 'linear-gradient(to bottom, transparent 0%, white 20%, white 80%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 20%, white 80%, transparent 100%)'
                  }}
                />
                <div className="absolute inset-0 bg-white opacity-10 blur-[1px]" />
              </div>

              {/* Arrowhead that seamlessly connects */}
              <div className="relative -mt-px">
                <svg
                  className="w-3 h-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 5v14M19 12l-7 7-7-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right side - Alerts */}
        <div className="w-full md:w-2/5 flex flex-col justify-start md:justify-center space-y-3  mt-6 md:mt-0 md:mr-16  md:px-16">
          <div className="flex flex-col  space-y-6  mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-bold text-[#4169e1] mb-2 md:mb-0 w-full"
            >
              Without Simbian
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className=""
            >
              <p className="text-[#4169e1] mb-1 text-sm">If this sounds all too familiar, you might want to...</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className=" flex justify-end"
            >
              <button
                onClick={onSwitchView}
                className="bg-white text-[#0e1a38] px-3 py-2 rounded-full font-medium flex items-center text-sm"
              >
                Book a Demo
                <span className="ml-1 inline-block bg-blue-500 rounded-full p-1">
                  <div className="w-3 h-3 bg-white rounded-sm transform rotate-45"></div>
                </span>
              </button>
            </motion.div>
          </div>


          {/* Alert cards with drag and drop */}
          <motion.div
            ref={ignoredRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1a2747] rounded-lg p-2.5 shadow-lg w-full"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-[#4169e1] mr-2" />
                <h3 className="text-white font-medium text-sm">Ignored Alerts</h3>
              </div>
              <motion.div
                key={ignoredAlerts}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-[#4169e1] text-2xl font-bold"
              >
                {ignoredAlerts}
              </motion.div>
            </div>
            <div className="mt-2 bg-white/10 rounded p-2 flex flex-wrap gap-1">
              {ignoredItems.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, "ignored")}
                  className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-white/5 transition-colors"
                >
                  {renderIcon(item.icon)}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={wronglyRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#1a2747] rounded-lg p-2.5 shadow-lg w-full"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <XCircle className="h-4 w-4 text-[#4169e1] mr-2" />
                <h3 className="text-white font-medium text-sm">Wrongly Closed</h3>
              </div>
              <motion.div
                key={wronglyClosed}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-[#4169e1] text-2xl font-bold"
              >
                {wronglyClosed}
              </motion.div>
            </div>
            <div className="mt-2 bg-white/10 rounded p-2 flex flex-wrap gap-1">
              {wronglyItems.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, "wrongly")}
                  className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-white/5 transition-colors"
                >
                  {renderIcon(item.icon)}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={activeRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#331a24] border border-red-900/50 rounded-lg p-2.5 shadow-lg transition-all duration-300 w-full"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-red-400 mr-2" />
                <h3 className="text-white font-medium text-sm">Active Threats</h3>
              </div>
              <motion.div
                key={activeThreats}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-red-400 text-2xl font-bold"
              >
                {activeThreats}
              </motion.div>
            </div>
            <div className="mt-2 bg-white/5 rounded p-2 flex flex-wrap gap-1 min-h-[32px]">
              <AnimatePresence>
                {activeItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="p-1 bg-white/10 rounded"
                  >
                    {renderIcon(item.icon)}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
