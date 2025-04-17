"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle,
  ShieldCheck,
  User,
  Grid,
  Plane,
  Zap,
  Circle,
  AlertCircle,
  XCircle,
  Shield,
  FileText,
} from "lucide-react"
import CustomNavbar from "./custom-navbar"

interface WithSimbianProps {
  onSwitchView: () => void
}

// Define alert icon types
type IconType = "grid" | "plane" | "zap" | "circle"

// Define alert item interface
interface AlertItem {
  id: string
  icon: IconType
}

export default function WithSimbian({ onSwitchView }: WithSimbianProps) {
  // Alert counts that will decrease over time
  const [ignoredAlerts, setIgnoredAlerts] = useState(101)
  const [wronglyClosed, setWronglyClosed] = useState(12)
  const [activeThreats, setActiveThreats] = useState(2)

  // Alert items in each card
  const [ignoredItems, setIgnoredItems] = useState<AlertItem[]>([])
  const [wronglyItems, setWronglyItems] = useState<AlertItem[]>([])
  const [activeItems, setActiveItems] = useState<AlertItem[]>([])

  // Animation for resolving alerts
  const [resolvingAlert, setResolvingAlert] = useState<{
    type: string
    target: "ignored" | "wrongly" | "active"
  } | null>(null)

  // Active timeline step
  const [activeStep, setActiveStep] = useState(0)

  // Flag to check if all alerts are resolved
  const [allResolved, setAllResolved] = useState(false)

  // Initialize alert items
  useEffect(() => {
    // Generate random icons for ignored alerts
    const ignoredIcons: AlertItem[] = Array(4)
      .fill(0)
      .map((_, i) => ({
        id: `ignored-${i}`,
        icon: ["grid", "plane", "zap", "circle"][Math.floor(Math.random() * 4)] as IconType,
      }))

    // Generate random icons for wrongly closed
    const wronglyIcons: AlertItem[] = Array(4)
      .fill(0)
      .map((_, i) => ({
        id: `wrongly-${i}`,
        icon: ["grid", "plane", "zap", "circle"][Math.floor(Math.random() * 4)] as IconType,
      }))

    // Generate random icons for active threats
    const activeIcons: AlertItem[] = Array(2)
      .fill(0)
      .map((_, i) => ({
        id: `active-${i}`,
        icon: ["grid", "plane"][Math.floor(Math.random() * 2)] as IconType,
      }))

    setIgnoredItems(ignoredIcons)
    setWronglyItems(wronglyIcons)
    setActiveItems(activeIcons)
  }, [])

  // Check if all alerts are resolved
  useEffect(() => {
    if (ignoredAlerts === 0 && wronglyClosed === 0 && activeThreats === 0) {
      setAllResolved(true)
    } else {
      setAllResolved(false)
    }
  }, [ignoredAlerts, wronglyClosed, activeThreats])

  // Sample alert types
  const alertTypes = [
    "Phishing Email Detected",
    "Suspicious Login Attempt",
    "Malware Detection",
    "Unusual Network Traffic",
    "Unauthorized Access Attempt",
  ]

  // Decrease counters periodically to show alerts being resolved
  useEffect(() => {
    // Start with a delay
    const initialDelay = setTimeout(() => {
      const interval = setInterval(() => {
        // Don't process if all alerts are resolved
        if (allResolved) {
          return
        }

        // Randomly select which counter to decrease
        const random = Math.random()
        const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)]

        if (ignoredAlerts > 0 && random < 0.6) {
          setResolvingAlert({ type: alertType, target: "ignored" })
          setTimeout(() => {
            setIgnoredAlerts((prev) => Math.max(0, prev - 1))
            setIgnoredItems((prev) => {
              if (prev.length > 0) {
                return prev.slice(0, -1)
              }
              return prev
            })
            setResolvingAlert(null)
          }, 1000)
        } else if (wronglyClosed > 0 && random < 0.9) {
          setResolvingAlert({ type: alertType, target: "wrongly" })
          setTimeout(() => {
            setWronglyClosed((prev) => Math.max(0, prev - 1))
            setWronglyItems((prev) => {
              if (prev.length > 0) {
                return prev.slice(0, -1)
              }
              return prev
            })
            setResolvingAlert(null)
          }, 1000)
        } else if (activeThreats > 0) {
          setResolvingAlert({ type: alertType, target: "active" })
          setTimeout(() => {
            setActiveThreats((prev) => Math.max(0, prev - 1))
            setActiveItems((prev) => {
              if (prev.length > 0) {
                return prev.slice(0, -1)
              }
              return prev
            })
            setResolvingAlert(null)
          }, 1000)
        }

        // Progress through timeline steps
        setActiveStep((prev) => (prev < 3 ? prev + 1 : 0))
      }, 5000) // Keep the original speed as requested

      return () => clearInterval(interval)
    }, 2000)

    return () => clearTimeout(initialDelay)
  }, [ignoredAlerts, wronglyClosed, activeThreats, allResolved])

  // Timeline steps based on the image
  const timelineSteps = [
    {
      title: "Triaged & Reported",
      description: "The SOC Agent handled investigation and reporting.",
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    },
    {
      title: "Less noise",
      description: "90% of alerts resolved automatically, 24/7",
      icon: <User className="h-4 w-4 text-green-500" />,
    },
    {
      title: "Holistic insight",
      description: "Correlate alerts and your environment into the big picture",
      icon: <ShieldCheck className="h-4 w-4 text-green-500" />,
    },
    {
      title: "Adapts automatically",
      description:
        "No SOAR needed. Investigate every alert, including new ones, with best of Simbian's knowledge and yours.",
      icon: <FileText className="h-4 w-4 text-green-500" />,
    },
  ]

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
      className="relative min-h-screen w-full overflow-x-hidden bg-[#1a4cff] bg-opacity-90 bg-blend-overlay bg-cover bg-center"
      style={{ backgroundImage: "url('/SimbianAI')" }}

    >
      {/* Navbar */}
      <div className="h-16">
        <CustomNavbar variant="with" onSwitchView={onSwitchView} />
      </div>

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] w-full max-w-full mx-auto px-6  pt-4 md:pt-8 pb-8  justify-between ">
        {/* Left side - Alert cards */}
        <div className="w-full md:w-2/5 flex flex-col justify-start md:justify-center space-y-3 md:px-16 pr-0 md:pr-4 ">
          <div className="mb-4">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-bold text-white"
            >
              With Simbian
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white text-base md:text-lg mt-1"
            >
              Relax. Our AI Agents will take it from here.
            </motion.p>
          </div>

          {/* Alert cards with animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`bg-[#1a4cff]/40 rounded-lg p-2.5 shadow-lg w-full ${resolvingAlert?.target === "ignored" && !allResolved ? "animate-pulse border border-green-500" : ""}`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-white mr-2" />
                <h3 className="text-white font-medium text-sm">Ignored Alerts</h3>
              </div>
              <motion.div
                key={ignoredAlerts}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-green-400 text-2xl font-bold"
              >
                {ignoredAlerts}
              </motion.div>
            </div>
            <div className="mt-2 bg-white/10 rounded p-2 flex flex-wrap gap-1">
              {ignoredItems.map((item) => (
                <motion.div key={item.id} className="p-1">
                  {renderIcon(item.icon)}
                </motion.div>
              ))}
            </div>

            {/* Resolving alert animation - only show if not all resolved */}
            <AnimatePresence>
              {resolvingAlert?.target === "ignored" && !allResolved && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 text-xs text-white bg-green-500/20 p-2 rounded flex items-center"
                >
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                  Resolving: {resolvingAlert.type}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`bg-[#1a4cff]/40 rounded-lg p-2.5 shadow-lg w-full ${resolvingAlert?.target === "wrongly" && !allResolved ? "animate-pulse border border-green-500" : ""}`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <XCircle className="h-4 w-4 text-white mr-2" />
                <h3 className="text-white font-medium text-sm">Wrongly Closed</h3>
              </div>
              <motion.div
                key={wronglyClosed}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-green-400 text-2xl font-bold"
              >
                {wronglyClosed}
              </motion.div>
            </div>
            <div className="mt-2 bg-white/10 rounded p-2 flex flex-wrap gap-1">
              {wronglyItems.map((item) => (
                <motion.div key={item.id} className="p-1">
                  {renderIcon(item.icon)}
                </motion.div>
              ))}
            </div>

            {/* Resolving alert animation - only show if not all resolved */}
            <AnimatePresence>
              {resolvingAlert?.target === "wrongly" && !allResolved && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 text-xs text-white bg-green-500/20 p-2 rounded flex items-center"
                >
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                  Resolving: {resolvingAlert.type}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`bg-[#1a4cff]/40 rounded-lg p-2.5 shadow-lg w-full ${resolvingAlert?.target === "active" && !allResolved ? "animate-pulse border border-green-500" : ""}`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-white mr-2" />
                <h3 className="text-white font-medium text-sm">Active Threats</h3>
              </div>
              <div className="text-green-400 text-2xl font-bold flex items-center">
                {activeThreats}
                {activeThreats === 0 && (
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                    className="ml-2"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </motion.div>
                )}
              </div>
            </div>
            <div className="mt-2 bg-white/10 rounded p-2 flex flex-wrap gap-1 min-h-[32px]">
              {activeItems.map((item) => (
                <motion.div key={item.id} className="p-1">
                  {renderIcon(item.icon)}
                </motion.div>
              ))}
            </div>

            {/* Resolving alert animation - only show if not all resolved */}
            <AnimatePresence>
              {resolvingAlert?.target === "active" && !allResolved && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 text-xs text-white bg-green-500/20 p-2 rounded flex items-center"
                >
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                  Resolving: {resolvingAlert.type}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* All resolved message */}
          <AnimatePresence>
            {allResolved && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/20 p-3 rounded-lg text-center w-full"
              >
                <CheckCircle className="h-6 w-6 mx-auto mb-1 text-green-500" />
                <p className="text-white text-sm font-medium">All alerts have been resolved!</p>
              </motion.div>
            )}
          </AnimatePresence>
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

        {/* Right side - Timeline */}
        <div className="w-full md:w-2/5 flex flex-col justify-start md:justify-center  md:pl-6     mt-6 md:mt-0 md:mr-16  md:px-16">
          <div className="relative">
            {/* Vertical line - hidden on mobile */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-green-500/30 hidden md:block"></div>

            {/* Timeline steps */}
            <div className="space-y-6 md:space-y-10 relative">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: activeStep === index ? 1.05 : 1,
                  }}
                  transition={{
                    delay: 0.3 + index * 0.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className={`flex items-start relative ${activeStep === index ? "z-10" : "z-0"}`}
                >
                  {/* Green dot with line */}
                  <div className="absolute left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{
                        scale: activeStep >= index ? 1 : 0,
                        backgroundColor: activeStep === index ? "#22c55e" : "#10b981",
                      }}
                      transition={{
                        delay: 0.5 + index * 0.2,
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="w-3 h-3 rounded-full bg-green-500 z-10"
                    ></motion.div>
                  </div>

                  {/* Horizontal line to dot */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: activeStep >= index ? "100%" : 0 }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                    className="absolute left-0 top-1/2 h-0.5 bg-green-500 transform -translate-y-1/2 z-0"
                    style={{ maxWidth: "12px" }}
                  ></motion.div>

                  {/* Content */}
                  <div className="ml-10 bg-[#1a4cff]/40 p-2.5 rounded-lg shadow-lg w-full transition-all duration-300">
                    <div className="flex items-center">
                      <div className="mr-2">{step.icon}</div>
                      <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="text-white/80 text-xs mt-1">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Switch view button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 flex justify-end"
          >
            <button
              onClick={onSwitchView}
              className="bg-white text-[#1a4cff] px-3 py-2 rounded-full font-medium flex items-center text-sm"
            >
              Switch to Without View
              <span className="ml-1 inline-block bg-[#1a4cff] rounded-full p-1">
                <div className="w-3 h-3 bg-white rounded-sm transform rotate-45"></div>
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
