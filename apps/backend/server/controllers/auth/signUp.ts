import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_KEY, ORIGIN } from '../../envConfig.js'
import { createUser, getUserByEmail, getUserByUsername } from '../../models/user.model.js'
import { validateUserSignUp } from '@repo/validations'

export const signUp = async (req: Request, res: Response): Promise<Response | void> => {
  const { success, data, errors } = validateUserSignUp(req.body)

  if (!success) {
    return res.status(400).json({ errors })
  }

  const { username, password, email } = data!

  // CHECK EXISTING USER
  try {
    const resultByEmail = await getUserByEmail(email)
    const resultByUsername = await getUserByUsername(username)
    if (resultByEmail || resultByUsername) {
      return res.status(409).json('username or email already exists.')
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error(errorMessage)
    return res.status(500).json('Error creating user.')
  }

  // CREATING NEW USER
  try {
    const newUserId = await createUser({ username, email, password })
    const token = jwt.sign({ id: newUserId }, JWT_KEY, {
      expiresIn: '14d'
    })
    return res
      .cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: '/',
        domain: ORIGIN
      })
      .status(201)
      .json({
        id: newUserId,
        message: 'User created successfully.'
      })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error(errorMessage)
    return res.status(500).json('Error creating user.')
  }
}
