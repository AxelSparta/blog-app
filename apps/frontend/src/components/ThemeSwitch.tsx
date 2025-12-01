'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FiMoon, FiSun } from "react-icons/fi"

export default function ThemeSwitch() {
	const [mounted, setMounted] = useState(false)
	const { setTheme, resolvedTheme } = useTheme()

	useEffect(() => setMounted(true), [])

	if (!mounted) {
		return (
			<div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
		)
	}

	return (
		<button
			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
			className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
			aria-label="Toggle Theme"
		>
			{resolvedTheme === 'dark' ? (
				<FiSun className="w-5 h-5" />
			) : (
				<FiMoon className="w-5 h-5" />
			)}
		</button>
	)
}