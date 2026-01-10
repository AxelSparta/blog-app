import { type Response } from 'express'
import type { AuthRequest } from '../../middlewares/isAuth.js'

export const dashboard = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const { _id, username, email, avatar } = req.user
    return res.json({ _id, username, email, avatar })
  } catch (error) {
    console.error(error)
    return res.status(500).json('Server internal error.')
  }
}
