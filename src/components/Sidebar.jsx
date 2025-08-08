"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

// Main Sidebar Component
export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Mess", href: "/admin/mess", icon: "🍽️" },
    { name: "Settings", href: "/admin/settings", icon: "⚙️", hasSubmenu: true },
  ]

  useEffect(() => {
    const mobileBreakpoint = 768

    const handleResize = () => {
      const currentIsMobile = window.innerWidth < mobileBreakpoint
      setIsMobile(currentIsMobile)
      // Set sidebar state based on screen size
      setIsOpen(!currentIsMobile)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [setIsOpen])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen)
  }

  return (
    <>
      {/* Toggle Button - Fixed position, always visible */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 z-60 p-2 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
          isOpen ? 'left-64' : 'left-4'
        } md:${isOpen ? 'left-64' : 'left-4'}`}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-gray-600" />
        ) : (
          <Menu className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Overlay for mobile view when sidebar is open */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          w-64 bg-white min-h-screen border-r border-indigo-200
          fixed inset-y-0 left-0 z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 pb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-900 flex items-center">
            
              <img className="mr-2 mt-1" height={35} width={35} src = "/images/logo.png" />
            
            Admin Panel
          </h1>
        </div>
        
        <nav className="mt-2 px-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-1">
                {item.hasSubmenu ? (
                  <div>
                    <button
                      onClick={toggleSettings}
                      className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200 ${
                        pathname.startsWith(item.href)
                          ? "bg-white/80 shadow-sm font-medium"
                          : "text-black hover:bg-white/50 hover:text-indigo-900"
                      }`}
                    >
                      <div className="flex items-center">
                        <span className={`mr-3 text-lg transition-transform ${pathname.startsWith(item.href) ? "scale-110" : ""}`}>
                          {item.icon}
                        </span>
                        {item.name}
                      </div>
                      <span className={`transform transition-transform ${settingsOpen ? 'rotate-90' : ''}`}>›</span>
                    </button>
                    {settingsOpen && (
                      <div className="ml-8 mt-1 mb-2">
                        <Link
                          href="/admin/settings/adminconfig"
                          className={`flex items-center p-2 rounded-lg text-sm transition-all duration-200 ${
                            pathname === "/admin/settings/adminconfig"
                              ? "bg-indigo-100 text-indigo-900 font-medium"
                              : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-800"
                          }`}
                          onClick={() => isMobile && setIsOpen(false)}
                        >
                          Admin Config
                          {pathname === "/admin/settings/adminconfig" && (
                            <span className="ml-auto w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                          )}
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                      pathname === item.href
                        ? "bg-white/80 shadow-sm font-medium"
                        : "text-black hover:bg-white/50 hover:text-indigo-900"
                    }`}
                    onClick={() => isMobile && setIsOpen(false)}
                  >
                    <span className={`mr-3 text-lg transition-transform ${pathname === item.href ? "scale-110" : ""}`}>
                      {item.icon}
                    </span>
                    {item.name}
                    {pathname === item.href && (
                      <span className="ml-auto w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-indigo-200">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center mr-3 text-indigo-800">👤</div>
            <div>
              <p className="font-medium text-indigo-900">Admin User</p>
              <p className="text-xs text-indigo-700">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}