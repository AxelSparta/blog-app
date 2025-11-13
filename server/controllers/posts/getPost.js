import Post from '../../schemas/Post.js'

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post || post.length === 0) {
      return res.status(404).json({ message: 'Post not found.' })
    }
    return res.json(post)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
