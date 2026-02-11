'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const pages = ['Facebook', 'Youtube', 'Instagram']
const links = ['/facebook', '/youtube', '/instagram']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const router = useRouter()

  const handleNavigateMobile = (link: string) => {
    router.push(link)
    setMobileOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-widest">LOGO</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6">
            {pages.map((page, index) => (
              <Link
                key={page}
                href={links[index]}
                className="hover:text-gray-200 transition"
              >
                {page}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden focus:outline-none"
            >
              ☰
            </button>

            {/* Avatar */}
            <div className="relative">
              <img
                src="https://i.pravatar.cc/40"
                alt="avatar"
                className="w-9 h-9 rounded-full cursor-pointer"
                onClick={() => setUserOpen(!userOpen)}
              />

              {userOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden">
                  {settings.map((setting) => (
                    <div
                      key={setting}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setUserOpen(false)}
                    >
                      {setting}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {pages.map((page, index) => (
              <div
                key={page}
                onClick={() => handleNavigateMobile(links[index])}
                className="block px-2 py-2 rounded hover:bg-blue-500 cursor-pointer"
              >
                {page}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
