"use client"

import { ChevronDown } from "lucide-react"

interface NavbarProps {
  onSwitchView: () => void
}

export default function WithSimbianNavbar({ onSwitchView }: NavbarProps) {
  return (
    <div className="relative w-full mt-[10px] ">
      {/* Slanted edge for navbar */}
      <div
        className="absolute right-0 top-0 left-[60%] h-full   z-10 rounded-md"
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 30% 100%, 0 0)",
        }}
      />

      <nav className="absolute right-0 top-0  bg-[#050a1b] py-3 px-6 w-[65%] z-20   rounded-l-md"
      
      style={{
        clipPath: "polygon(100% 0, 100% 100%, 10% 100%, 0 0)",
      }}>
        <div className="flex justify-between items-center ml-20">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center mr-2">
                <div className="w-5 h-5 bg-[#1a4cff] rounded-sm transform rotate-45"></div>
              </div>
              <span className="text-white font-semibold text-xl">Simbian</span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
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
            </div>
          </div>

          <button
            onClick={onSwitchView}
            className="bg-white text-[#1a4cff] px-4 py-2 rounded-md font-medium flex items-center relative"
            style={{
              clipPath: "polygon(100% 0, 100% 100%, 10% 100%, 0 0)",
            }}
          >
            <span className="mr-8">Book a Demo</span>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1a4cff] rounded-full p-1">
              <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
            </span>
          </button>
        </div>
      </nav>
    </div>
  )
}
