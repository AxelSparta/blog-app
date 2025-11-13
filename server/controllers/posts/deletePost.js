import { deleteImage } from '../../libs/cloudinary.js'
import Post from '../../schemas/Post.js'

export const deletePost = async (req, res) => {
  try {
    const user = req.user
    const { id } = req.params
    const postToDelete = await Post.findById(id)
    if (!postToDelete) {
      return res.status(404).json({ message: 'Post not found' })
    }
    if (postToDelete.userId !== user.id) {
      return res.status(401).status('Not authorized.')
    }

    await postToDelete.delete()
    if (postToDelete.image) {
      // verificando si tiene imagen y eliminandola
      await deleteImage(postToDelete.image.public_id)
    }

    return res.status(200).json('Post deleted successfully.')
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
