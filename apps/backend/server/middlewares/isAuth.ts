import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../envConfig.js'
import { getUserById } from '../models/user.model.js'

export interface AuthRequest extends Request {
  user?: any
}

export const isAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { access_token: accessToken } = req.cookies
    if (!accessToken) {
      res.status(401).json('No token was provided.')
      return
    }
    const { id } = jwt.verify(accessToken, JWT_KEY) as { id: string }
    if (!id) {
      res.status(400).json('Invalid token.')
      return
    }

    const user = await getUserById(id)

    if (!user) {
      res
        .clearCookie('access_token', {
          sameSite: 'none',
          secure: true
        })
        .status(404)
        .json('User not found.')
      return
    }
    req.user = user
    next()
  } catch (error) {
    res
      .clearCookie('access_token', {
        sameSite: 'none',
        secure: true
      })
      .status(500)
      .json('Internal server error.')
  }
}
