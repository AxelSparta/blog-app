import { deleteImage } from '../../libs/cloudinary.js'
import Post from '../../schemas/Post.js'

export const deleteUser = async (req, res) => {
  try {
    const user = req.user
    await Post.deleteMany({ userId: user.id })
    if (user.avatar && user.avatar.public_id) {
      await deleteImage(user.avatar.public_id)
    }
    await user.delete()

    // clear cookie
    return res
      .clearCookie('access_token', {
        sameSite: 'none',
        secure: true
      })
      .status(200)
      .json('User has been deleted.')
  } catch (error) {
    return res.status(500).json(error.message)
  }
}
