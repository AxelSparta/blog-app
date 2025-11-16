import { getPosts as fetchPosts } from '../../models/post.model.js'

export const getPosts = async (req, res) => {
  try {
    const { id } = req.params
    const posts = await fetchPosts(id)
    return res.json(posts)
  } catch (error) {
    console.error(error)
    return res.status(500).json('Something went wrong.')
  }
}
