"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface AlertCardProps {
  title: string
  count: number
  icon: React.ReactNode
  alerts: string[]
  description: string
  color: "amber" | "red" | "purple" | "emerald"
  showCheckmark?: boolean
}

export default function AlertCard({
  title,
  count,
  icon,
  alerts,
  description,
  color,
  showCheckmark = false,
}: AlertCardProps) {
  // Define color classes based on the color prop
  const colorClasses = {
    amber: "border-amber-800 bg-gradient-to-br from-slate-800 to-amber-950/30",
    red: "border-red-800 bg-gradient-to-br from-slate-800 to-red-950/30",
    purple: "border-purple-800 bg-gradient-to-br from-slate-800 to-purple-950/30",
    emerald: "border-emerald-800 bg-gradient-to-br from-slate-800 to-emerald-950/30",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border ${colorClasses[color]} p-6 shadow-lg h-full flex flex-col`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          {icon}
          <h3 className="text-xl font-semibold ml-2">{title}</h3>
        </div>
        <motion.div
          key={count}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-2xl font-bold ${color === "emerald" ? "text-emerald-400" : "text-white"}`}
        >
          {count}
          {showCheckmark && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block ml-2"
            >
              <CheckCircle className="h-6 w-6 text-emerald-500 inline" />
            </motion.span>
          )}
        </motion.div>
      </div>

      <p className="text-slate-400 mb-4">{description}</p>

      <div className="flex-grow overflow-hidden">
        <div className="space-y-2 h-full">
          <AnimatePresence>
            {alerts.map((alert, index) => (
              <motion.div
                key={`${alert}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-3 rounded text-sm ${
                  color === "emerald" ? "bg-emerald-900/20 border border-emerald-800" : "bg-slate-700/50"
                }`}
              >
                {alert}
              </motion.div>
            ))}
          </AnimatePresence>

          {alerts.length === 0 && color === "emerald" && (
            <div className="flex items-center justify-center h-full py-8">
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [0.98, 1, 0.98],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                }}
                className="text-emerald-500 text-center"
              >
                <CheckCircle className="h-12 w-12 mx-auto mb-2" />
                <p>All alerts resolved</p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
