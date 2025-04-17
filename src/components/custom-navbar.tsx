"use client"

import { useState } from "react"
import { ChevronDown, Menu, X } from 'lucide-react'

interface CustomNavbarProps {
  variant: "without" | "with"
  onSwitchView: () => void
}

export default function CustomNavbar({ variant, onSwitchView }: CustomNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Define styling based on variant
  const styles = {
    without: {
      container: "bg-[#050a1b]",
      button: "bg-white text-[#0e1a38]",
      buttonIcon: "bg-blue-500",
      mobileMenu: "bg-[#050a1b]",
    },
    with: {
      container: "bg-[#050a1b]",
      button: "bg-white text-[#1a4cff]",
      buttonIcon: "bg-[#1a4cff]",
      mobileMenu: "bg-[#050a1b]",
    },
  }

  const currentStyle = styles[variant]

  return (
    <div className="relative w-full mt-[10px]">
      {/* Desktop Navbar - hidden on mobile */}
      <div 
        className="absolute right-0 top-0 left-[60%] xl:left-[70%] h-full z-10 rounded-md hidden md:block"
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 30% 100%, 0 0)",
        }}
      />

      <nav 
        className={`absolute right-0 top-0 ${currentStyle.container} py-2 lg:py-3 px-4 lg:px-6 w-[65%] lg:w-[70%] xl:w-[75%] z-20 rounded-l-md hidden md:block`}
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 10% 100%, 0 0)",
        }}
      >
        <div className="flex justify-between items-center ml-10 lg:ml-20">
          <div className="flex items-center space-x-4 lg:space-x-8">
            <div className="flex items-center">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white rounded-md flex items-center justify-center mr-2">
                <div className="w-3 h-3 lg:w-5 lg:h-5 bg-[#1a4cff] rounded-sm transform rotate-45"></div>
              </div>
              <span className="text-white font-semibold text-lg lg:text-xl">Simbian</span>
            </div>

            <div className="flex items-center space-x-3 lg:space-x-6">
              <div className="flex items-center">
                <span className="text-white text-[13px] lg:text-[15px]">Products</span>
                <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4 ml-1 text-gray-200" />
              </div>
              <div className="flex items-center">
                <span className="text-white text-[13px] lg:text-[15px]">Company</span>
                <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4 ml-1 text-gray-200" />
              </div>
              <div className="flex items-center">
                <span className="text-white text-[13px] lg:text-[15px]">Resources</span>
                <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4 ml-1 text-gray-200" />
              </div>
              <span className="text-white text-[13px] lg:text-[15px]">Blog</span>
            </div>
          </div>

          <button
            onClick={onSwitchView}
            className={`${currentStyle.button} px-2 lg:px-4 py-1 lg:py-2 rounded-md font-medium flex items-center relative`}
            style={{
              clipPath: "polygon(100% 0, 100% 100%, 10% 100%, 0 0)",
            }}
          >
            <span className="mr-6 lg:mr-8 text-xs lg:text-sm whitespace-nowrap">Book a Demo</span>
            <span className={`absolute right-1 lg:right-2 top-1/2 transform -translate-y-1/2 ${currentStyle.buttonIcon} rounded-full p-0.5 lg:p-1`}>
              <div className="w-3 h-3 lg:w-4 lg:h-4 bg-white rounded-sm transform rotate-45"></div>
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Navbar - visible only on mobile */}
      <div className="md:hidden">
        <div className={`${currentStyle.container} py-3 px-4 flex justify-between items-center`}>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center mr-2">
              <div className="w-5 h-5 bg-[#1a4cff] rounded-sm transform rotate-45"></div>
            </div>
            <span className="text-white font-semibold text-xl">Simbian</span>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className={`${currentStyle.mobileMenu} absolute w-full z-50 shadow-lg`}>
            <div className="flex flex-col p-4 space-y-4">
              <div className="flex items-center">
                <span className="text-white">Products</span>
                <ChevronDown className="h-4 w-4 ml-1 text-gray-200" />
              </div>
              <div className="flex items-center">
                <span className="text-white">Company</span>
                <ChevronDown className="h-4 w-4 ml-1 text-gray-200" />
              </div>
              <div className="flex items-center">
                <span className="text-white">Resources</span>
                <ChevronDown className="h-4 w-4 ml-1 text-gray-200" />
              </div>
              <span className="text-white">Blog</span>

              <button
                onClick={onSwitchView}
                className={`${currentStyle.button} px-2 py-1.5 rounded-md font-medium flex items-center justify-between mt-2`}
                style={{
                  clipPath: "polygon(100% 0, 100% 100%, 5% 100%, 0 0)",
                }}
              >
                <span className="ml-4">Book a Demo</span>
                <span className={`${currentStyle.buttonIcon} rounded-full p-1 mr-2`}>
                  <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}