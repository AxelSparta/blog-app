import Post from '../../schemas/Post.js'
import { categoryValidation } from '../../validations/post.validation.js'
export const getPostsCat = async (req, res) => {
  try {
    const { cat } = req.query
    if (categoryValidation(cat).error) {
      return res.status(400).json('Invalid category.')
    }
    const posts = await Post.find({ category: cat })

    return res.json(posts)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
