'use client'

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { type Post } from "../types/Post"
import { PostCard } from "./PostCard"

export function Posts() {
	const searchParams = useSearchParams()
	const [posts, setPosts] = useState<Post[]>([])
	
	useEffect(() => {
		const category = searchParams.get('cat')
		const fetchPosts = async () => {
			const response = await fetch(`http://localhost:4000/api/posts?category=${category}`)
			const data = await response.json()
			setPosts(data)
		}
		fetchPosts()
	}, [searchParams])
	return (
		<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{posts.map((post: Post) => (
				<PostCard post={post} key={post._id} />
			))}
		</div>
	)
}