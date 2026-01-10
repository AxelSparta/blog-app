import { type Response } from 'express'
import { deleteImage } from '../../libs/cloudinary.js'
import { deletePostsByUserId } from '../../models/post.model.js'
import type { AuthRequest } from '../../middlewares/isAuth.js'

export const deleteUser = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  const user = req.user
  const password = req.body.password as string | undefined

  if (!password) {
    return res.status(400).json('Password is required to delete user.')
  }
  const isPasswordCorrect = await user.comparePassword(password, req.user.password)
  if (!isPasswordCorrect) {
    return res.status(401).json('Unauthorized incorrect password.')
  }

  try {
    await deletePostsByUserId(user._id.toString())
    if (user.avatar && user.avatar.public_id) {
      await deleteImage(user.avatar.public_id)
    }
    await user.deleteOne()

    // clear cookie
    return res
      .clearCookie('access_token', {
        sameSite: 'none',
        secure: true
      })
      .status(200)
      .json('User has been deleted.')
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return res.status(500).json(errorMessage)
  }
}
