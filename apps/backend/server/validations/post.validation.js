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

export const categoryValidation = category => {
  const result = categorySchema.safeParse(category)
  if (!result.success) {
    return { error: true, message: 'Invalid category.' }
  }
  return { error: false }
}

export const postValidation = postData => {
  const result = postSchema.safeParse(postData)
  if (!result.success) {
    return {
      error: true,
      message: z.flattenError(result.error).fieldErrors
    }
  }
  return { error: false, data: result.data }
}

export const partialPostSchema = postSchema.partial()

export const partialPostValidation = postData => {
  const result = partialPostSchema.safeParse(postData)
  if (!result.success) {
    return {
      error: true,
      message: z.flattenError(result.error).fieldErrors
    }
  }
  return { error: false, data: result.data }
}
