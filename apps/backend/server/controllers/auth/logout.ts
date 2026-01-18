import { type Request, type Response } from 'express'

export const logout = (req: Request, res: Response): Response => {
  return res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true
    })
    .status(200)
    .json('User has been logged out.')
}
