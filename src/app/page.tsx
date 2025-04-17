"use client"
import { useState } from "react"
import WithoutSimbian from "@/components/without-simbian"
import WithSimbian from "@/components/with-simbian"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [activeSection, setActiveSection] = useState<"without" | "with">("without")

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8, // Slow transition
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.6, // Slow exit
      },
    },
  }

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {activeSection === "without" ? (
          <motion.div
            key="without"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="bg-[#0e1a38] min-h-[100vh] w-full py-1"
          >
            <WithoutSimbian onSwitchView={() => setActiveSection("with")} />
          </motion.div>
        ) : (
          <motion.div
            key="with"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="bg-[#1a4cff] min-h-[100vh] w-full py-1"
          >
            <WithSimbian onSwitchView={() => setActiveSection("without")} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
