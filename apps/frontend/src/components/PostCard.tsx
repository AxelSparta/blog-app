import { Post } from "@/types/Post"
import Image from "next/image"


// Category color mappings
const categoryColors = {
	technology: 'from-blue-500 to-cyan-500',
	art: 'from-purple-500 to-pink-500',
	science: 'from-green-500 to-emerald-500',
	cinema: 'from-red-500 to-orange-500',
	design: 'from-indigo-500 to-violet-500',
	food: 'from-orange-500 to-yellow-500',
}

const categoryBadgeColors = {
	technology: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
	art: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
	science: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
	cinema: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
	design: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
	food: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
}

export function PostCard({ post }: { post: Post }) {
	// Format date
	const formattedDate = new Date(post.createdAt).toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})

	// Get content preview (first 120 characters)
	const contentPreview = post.content.length > 120 
		? post.content.substring(0, 120) + '...' 
		: post.content

	// Get category gradient
	const categoryGradient = categoryColors[post.category] || categoryColors.technology
	const badgeColor = categoryBadgeColors[post.category] || categoryBadgeColors.technology

	return (
		<article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
			{/* Image or Gradient Background */}
			<div className="relative aspect-video w-full overflow-hidden bg-muted">
				{post.image?.url ? (
					<Image 
						src={post.image.url}
						alt={post.title}
						fill
						className="object-cover transition-transform duration-300 group-hover:scale-105"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
					/>
				) : (
					<div className={`h-full w-full bg-linear-to-br ${categoryGradient} opacity-80`} />
				)}
				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
				
				{/* Category Badge */}
				<div className="absolute top-3 left-3">
					<span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${badgeColor}`}>
						{post.category}
					</span>
				</div>
			</div>

			{/* Content */}
			<div className="flex flex-1 flex-col gap-3 p-5">
				{/* Title */}
				<h3 className="line-clamp-2 text-xl font-semibold leading-tight text-card-foreground transition-colors group-hover:text-primary">
					{post.title}
				</h3>

				{/* Content Preview */}
				<p className="line-clamp-3 flex-1 text-sm text-muted-foreground">
					{contentPreview}
				</p>

				{/* Footer with Date */}
				<div className="flex items-center justify-between border-t border-border pt-3 mt-auto">
					<time className="text-xs text-muted-foreground" dateTime={post.createdAt}>
						{formattedDate}
					</time>
					<svg 
						className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" 
						fill="none" 
						viewBox="0 0 24 24" 
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</div>
			</div>

			{/* Hover Border Effect */}
			<div className="absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300 group-hover:border-primary/20 pointer-events-none" />
		</article>
	)
}