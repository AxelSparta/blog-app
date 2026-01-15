import { type Request, type Response } from 'express'
import { ORIGIN } from '../../envConfig.js'

export const logout = (req: Request, res: Response): Response => {
  return res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
      domain: ORIGIN
    })
    .status(200)
    .json('User has been logged out.')
}
