'use client'

import ThemeSwitch from '@/components/ThemeSwitch'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaBars, FaPen, FaSignInAlt, FaSignOutAlt, FaTimes } from 'react-icons/fa'
import logo from '../assets/logo-blog.png'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLogout = async () => {
    try {
      // Add logout logic here
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <nav className='bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link href='/' className='shrink-0 flex items-center' onClick={closeMenu}>
            <Image src={logo} alt='Blog Logo' width={40} height={40} className='w-10 h-10' />
          </Link>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center space-x-4'>
            <Link href='/?cat=food' className='text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors'>Food</Link>
            <Link href='/?cat=design' className='text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors'>Design</Link>
            <Link href='/?cat=cinema' className='text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors'>Cinema</Link>
            <Link href='/?cat=science' className='text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors'>Science</Link>
            <Link href='/?cat=art' className='text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors'>Art</Link>
            <Link href='/?cat=technology' className='text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors'>Tech</Link>

            <div className='flex items-center space-x-4 ml-4 border-l pl-4 border-gray-200 dark:border-gray-700'>
              {/* Auth Links - Example state, replace with actual auth logic */}
              <Link href='/write' className='flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors'>
                <FaPen className='mr-1' /> Write
              </Link>
              <Link href='/login' className='flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors'>
                <FaSignInAlt className='mr-1' /> Login
              </Link>
              <ThemeSwitch />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center'>
            <ThemeSwitch />
            <button
              onClick={toggleMenu}
              className='ml-4 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
              aria-expanded={isMenuOpen}
            >
              <span className='sr-only'>Open main menu</span>
              {isMenuOpen ? (
                <FaTimes className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <FaBars className='block h-6 w-6' aria-hidden='true' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900`}>
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
          <Link href='/?cat=food' onClick={closeMenu} className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800'>Food</Link>
          <Link href='/?cat=design' onClick={closeMenu} className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800'>Design</Link>
          <Link href='/?cat=cinema' onClick={closeMenu} className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800'>Cinema</Link>
          <Link href='/?cat=science' onClick={closeMenu} className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800'>Science</Link>
          <Link href='/?cat=art' onClick={closeMenu} className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800'>Art</Link>
          <Link href='/?cat=technology' onClick={closeMenu} className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800'>Tech</Link>
        </div>
        <div className='pt-4 pb-4 border-t border-gray-200 dark:border-gray-800'>
          <div className='px-2 space-y-1'>
            <Link href='/write' onClick={closeMenu} className='flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800'>
              <FaPen className='mr-2' /> Write
            </Link>
            <Link href='/login' onClick={closeMenu} className='flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800'>
              <FaSignInAlt className='mr-2' /> Login
            </Link>
            <button onClick={handleLogout} className='w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800 text-left'>
              <FaSignOutAlt className='mr-2' /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
