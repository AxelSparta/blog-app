import { type Response } from 'express'
import { deleteImage } from '../../libs/cloudinary.js'
import { deletePostById, getPostById } from '../../models/post.model.js'
import type { AuthRequest } from '../../middlewares/isAuth.js'

export const deletePost = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const user = req.user
    const { id: postId } = req.params
    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' })
    }
    const postToDelete = await getPostById(postId)
    if (!postToDelete) {
      return res.status(404).json({ message: 'Post not found' })
    }
    if (postToDelete.userId !== user._id.toString()) {
      return res.status(401).json('Not authorized.')
    }

    if (postToDelete.image?.public_id) {
      // verificando si tiene imagen y eliminandola
      const result = await deleteImage(postToDelete.image.public_id!)
      console.log(result)
    }

    await deletePostById(postId)

    return res.status(200).json('Post deleted successfully.')
  } catch (error) {
    console.error(error)
    return res.status(500).json('Something went wrong.')
  }
}
