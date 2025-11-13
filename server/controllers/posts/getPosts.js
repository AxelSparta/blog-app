import Post from '../../schemas/Post.js'

export const getPosts = async (req, res) => {
  try {
    const { id } = req.params
    let posts
    if (id) {
      posts = await Post.find({ userId: id })
    } else {
      posts = await Post.find()
    }
    return res.json(posts)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
