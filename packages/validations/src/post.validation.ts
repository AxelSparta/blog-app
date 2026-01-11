import { z } from 'zod'
import { imageFileSchema } from './image.validation.ts'

export const categorySchema = z.enum([
  'technology',
  'art',
  'science',
  'cinema',
  'design',
  'food'
])

const postSchema = z.object({
  title: z.string().min(3).max(200),
  content: z.string().min(20).max(3000),
  category: categorySchema
})

// Helper function to strip HTML tags and get text content length
const getTextContentLength = (html: string): number => {
  if (typeof window === 'undefined') {
    // Server-side: simple regex to remove tags (not perfect but works for validation)
    return html.replace(/<[^>]*>/g, '').trim().length
  }
  // Client-side: use DOM to get accurate text content
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent?.trim().length || 0
}

// Frontend form schema with HTML content validation and image field
export const postFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title must be at most 200 characters'),
  content: z
    .string()
    .min(1, 'Content is required')
    .refine(
      (val) => getTextContentLength(val) >= 20,
      'Content must be at least 20 characters (excluding formatting)'
    )
    .refine(
      (val) => getTextContentLength(val) <= 3000,
      'Content must be at most 3000 characters (excluding formatting)'
    ),
  category: categorySchema,
  image: imageFileSchema(2).optional().or(z.null()),
})

export type PostFormData = z.infer<typeof postFormSchema>

export const categoryValidation = (category: unknown) => {
  const result = categorySchema.safeParse(category)
  if (!result.success) {
    return { error: true, message: 'Invalid category.' }
  }
  return { error: false }
}

export const postValidation = (postData: unknown) => {
  const result = postSchema.safeParse(postData)
  if (!result.success) {
    return {
      error: true,
      message: result.error.flatten().fieldErrors
    }
  }
  return { error: false, data: result.data }
}

export const partialPostSchema = postSchema.partial()

export const partialPostValidation = (postData: unknown) => {
  const result = partialPostSchema.safeParse(postData)
  if (!result.success) {
    return {
      error: true,
      message: result.error.flatten().fieldErrors
    }
  }
  return { error: false, data: result.data }
}

export const titleValidation = (title: string) => {
  const result = postSchema.shape.title.safeParse(title)
  if (!result.success) {
    return { error: true, message: 'Title must be between 3 and 200 characters.' }
  }
  return { error: false }
}

export const contentValidation = (content: string) => {
  const result = postSchema.shape.content.safeParse(content)
  if (!result.success) {
    return { error: true, message: 'Content must be between 20 and 3000 characters.' }
  }
  return { error: false }
}
