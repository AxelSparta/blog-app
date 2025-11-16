import { deleteImage } from '../../libs/cloudinary.js'
import { deletePostById, getPostById } from '../../models/post.model.js'

export const deletePost = async (req, res) => {
  try {
    const user = req.user
    const { id: postId } = req.params
    const postToDelete = await getPostById(postId)
    if (!postToDelete) {
      return res.status(404).json({ message: 'Post not found' })
    }
    if (postToDelete.userId !== user.id) {
      return res.status(401).json('Not authorized.')
    }

    if (postToDelete.image) {
      // verificando si tiene imagen y eliminandola
      const result = await deleteImage(postToDelete.image.public_id)
      console.log(result)
    }

    await deletePostById(postId)

    return res.status(200).json('Post deleted successfully.')
  } catch (error) {
    console.error(error)
    return res.status(500).json('Something went wrong.')
  }
}
