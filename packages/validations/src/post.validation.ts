import { z } from 'zod'

const categorySchema = z.enum([
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
