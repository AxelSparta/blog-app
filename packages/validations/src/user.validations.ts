import { z } from 'zod'

export const usernameSchema = z
  .string()
  .trim()
  .min(3, 'Username must be at least 3 characters long.')
  .max(30, 'Username must be at most 30 characters long.')
  .regex(
    /^(?!.*__)(?!.*\.\.)(?!.*\.$)(?!^\.)[A-Za-z][A-Za-z0-9._]{2,29}$/,
    'Username must start with a letter and can only contain letters, numbers, underscores, and dots. No consecutive underscores or dots allowed.'
  )

export const validateUsername = (username: string) => {
  return usernameSchema.safeParse(username).success
}

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long.')
  .max(30, 'Password must be at most 30 characters long.')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    'Password must contain at least one number, one uppercase letter, and one lowercase letter.'
  )

export const validatePassword = (password: string) => {
  return passwordSchema.safeParse(password).success
}

const userSignUpSchema = z.object({
  username: usernameSchema,
  email: z.string().email('Invalid email address.'),
  password: passwordSchema
})

const userSignInSchema = z.object({
  username: usernameSchema,
  password: passwordSchema
})

// Frontend form schemas
export const signInFormSchema = z.object({
  username: usernameSchema,
  password: passwordSchema
})

export const signUpFormSchema = z.object({
  username: usernameSchema,
  email: z.string().email('Invalid email address.'),
  password: passwordSchema,
  confirmPassword: passwordSchema,
})

const userPartialSchema = z.object({
  username: usernameSchema.optional(),
  email: z.string().email('Invalid email address.').optional(),
  password: passwordSchema.optional(),
  newPassword: passwordSchema.optional()
})

export const validateUserPartial = (data: unknown) => {
  const result = userPartialSchema.safeParse(data)
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors
    }
  }
  return { success: true, data: result.data }
}

export const validateUserSignUp = (data: unknown) => {
  const result = userSignUpSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors
    }
  }

  return { success: true, data: result.data }
}

export const validateUserSignIn = (data: unknown) => {
  const result = userSignInSchema.safeParse(data)
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors
    }
  }
  return { success: true, data: result.data }
}
