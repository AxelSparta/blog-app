import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { DOMAIN, JWT_KEY, ORIGIN } from '../../envConfig.js'
import { getUserByUsername } from '../../models/user.model.js'
import { validateUserSignIn } from '@repo/validations'

export const signIn = async (req: Request, res: Response): Promise<Response | void> => {
  const { success, errors, data } = validateUserSignIn(req.body)

  if (!success) {
    return res.status(400).json(errors)
  }

  const { username, password } = data!

  try {
    const user = await getUserByUsername(username)

    if (!user) {
      return res.status(404).json('Username or password is not correct.')
    }

    const isPasswordCorrect = await user.comparePassword(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(404).json('Username or password is not correct.')
    }

    const token = jwt.sign({ id: user._id }, JWT_KEY, {
      expiresIn: '14d'
    })

    return res
      .cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: "/"
      })
      .status(200)
      .json({
        message: 'Sign in successful.',
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      })
  } catch (error) {
    console.error(error)
    return res.status(500).json('Internal server error.')
  }
}
