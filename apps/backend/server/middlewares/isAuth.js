import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../envConfig.js'
import { getUserById } from '../models/user.model.js'

export const isAuth = async (req, res, next) => {
  try {
    const { access_token: accessToken } = req.cookies
    if (!accessToken) return res.status(401).json('No token was provided.')
    const { id } = jwt.verify(accessToken, JWT_KEY)
    if (!id) return res.status(400).json('Invalid token.')

    const user = await getUserById(id)

    if (!user) {
      return res
        .clearCookie('access_token', {
          sameSite: 'none',
          secure: true
        })
        .status(404)
        .json('User not found.')
    }
    req.user = user
    next()
  } catch (error) {
    return res
      .clearCookie('access_token', {
        sameSite: 'none',
        secure: true
      })
      .status(500)
      .json('Internal server error.')
  }
}
