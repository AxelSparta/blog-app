import { z } from 'zod'

const userSignUpSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters long.')
    .max(30, 'Username must be at most 30 characters long.')
    .regex(
      /^(?!.*__)(?!.*\.\.)(?!.*\.$)(?!^\.)[A-Za-z][A-Za-z0-9._]{2,29}$/,
      'Username must start with a letter and can only contain letters, numbers, underscores, and dots. No consecutive underscores or dots allowed.'
    ),
  email: z.email('Invalid email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(30, 'Password must be at most 30 characters long.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password must contain at least one number, one uppercase letter, and one lowercase letter.'
    )
})

export const validateUserSignUp = data => {
  const result = userSignUpSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      errors: z.flattenError(result.error).fieldErrors
    }
  }

  return { success: true, data: result.data }
}

export const validatePassword = password => {
  // password must contain one number, one uppercase letter and one lowercase letter
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  const isValid = passwordRegExp.test(password)
  return isValid
}

export const validateUsername = username => {
  // username debe tener entre 8 y 30 caracteres, solo puede contener '_' como caracter especial y debe empezar con una letra
  const usernameRegExp = /^[A-Za-z][A-Za-z0-9_]{7,29}$/
  const isValid = usernameRegExp.test(username)
  return isValid
}

export const validateEmail = email => {
  // RegEx email según w3.org
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const isValid = emailRegExp.test(email)
  return isValid
}
