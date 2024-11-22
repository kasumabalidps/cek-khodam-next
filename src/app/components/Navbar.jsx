'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="max-w-6xl mx-auto py-4 md:py-8 px-4 relative z-50 bg-gray-800">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold uppercase text-white underline underline-offset-4 decoration-2">
          Cek Khodam
        </h1>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-x-5 text-white text-base">
          <li className={`${pathname === '/' ? 'font-bold' : 'font-regular'} hover:text-gray-300 transition-colors`}>
            <Link href="/">Home</Link>
          </li>
          <li className={`${pathname === '/listkhodam' ? 'font-bold' : 'font-regular'} hover:text-gray-300 transition-colors`}>
            <Link href="/listkhodam">List Khodam</Link>
          </li>
          <li className={`${pathname === '/developer' ? 'font-bold' : 'font-regular'} hover:text-gray-300 transition-colors`}>
            <Link href="/developer">Developer</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-4 absolute w-full left-0 bg-gray-800 border-t border-gray-700 p-4`}>
        <ul className="flex flex-col gap-y-2 text-white text-sm">
          <li className={`${pathname === '/' ? 'font-bold' : 'font-regular'} hover:text-gray-300 transition-colors`}>
            <Link href="/">Home</Link>
          </li>
          <li className={`${pathname === '/listkhodam' ? 'font-bold' : 'font-regular'} hover:text-gray-300 transition-colors`}>
            <Link href="/listkhodam">List Khodam</Link>
          </li>
          <li className={`${pathname === '/developer' ? 'font-bold' : 'font-regular'} hover:text-gray-300 transition-colors`}>
            <Link href="/developer">Developer</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar