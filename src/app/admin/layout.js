"use client"
import { useState } from "react"
import Sidebar from "@/components/Sidebar"

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar with integrated toggle */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        sidebarOpen ? 'ml-64' : 'ml-0'
      }`}>
        {/* Page content */}
        <main className="p-4 md:p-6 pt-16">
          {children}
        </main>
      </div>
    </div>
  )
}
