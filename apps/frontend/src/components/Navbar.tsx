"use client"

import logo from "@/../public/logo-blog.png"
import ThemeSwitch from "@/components/ThemeSwitch"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  FaBars,
  FaPen,
  FaSignInAlt,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa"

const CATEGORIES = [
  { name: "Food", href: "/?cat=food" },
  { name: "Design", href: "/?cat=design" },
  { name: "Cinema", href: "/?cat=cinema" },
  { name: "Science", href: "/?cat=science" },
  { name: "Art", href: "/?cat=art" },
  { name: "Tech", href: "/?cat=technology" },
]

const navLinkClasses =
  "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
const mobileNavLinkClasses =
  "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // TODO: Implement actual logout logic
  const handleLogout = async () => {
    try {
      // Add logout logic here
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 flex items-center"
            onClick={closeMenu}
          >
            <Image
              src={logo}
              alt="Blog Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </Link>

          <div className="flex justify-between items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 mr-4">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className={navLinkClasses}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/write" className={`flex items-center ${navLinkClasses}`}>
                <FaPen className="mr-1" /> Write
              </Link>
              <Link href="/login" className={`flex items-center ${navLinkClasses}`}>
                <FaSignInAlt className="mr-1" /> Login
              </Link>
              <button
                onClick={handleLogout}
                className={`flex items-center ${navLinkClasses}`}
              >
                <FaSignOutAlt className="mr-1" /> Logout
              </button>
              <div className="pl-4 border-l border-gray-200 dark:border-gray-700">
                <ThemeSwitch />
              </div>
            </div>
          </div>

          {/* Mobile Right Section (Theme + Hamburger) */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeSwitch />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {CATEGORIES.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                onClick={closeMenu}
                className={mobileNavLinkClasses}
              >
                {category.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-4 border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-1 px-2">
              <Link
                href="/write"
                onClick={closeMenu}
                className={`flex items-center ${mobileNavLinkClasses}`}
              >
                <FaPen className="mr-2" /> Write
              </Link>
              <Link
                href="/login"
                onClick={closeMenu}
                className={`flex items-center ${mobileNavLinkClasses}`}
              >
                <FaSignInAlt className="mr-2" /> Login
              </Link>
              <button
                onClick={() => {
                  handleLogout()
                  closeMenu()
                }}
                className={`w-full flex items-center ${mobileNavLinkClasses}`}
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
