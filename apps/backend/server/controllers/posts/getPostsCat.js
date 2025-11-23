import { getPostByCategory } from '../../models/post.model.js'
import { categoryValidation } from '../../validations/post.validation.js'
export const getPostsCat = async (req, res) => {
  try {
    const { cat } = req.query
    if (categoryValidation(cat).error) {
      return res.status(400).json('Invalid category.')
    }
    const posts = await getPostByCategory(cat)

    return res.json(posts)
  } catch (error) {
    console.error(error)
    return res.status(500).json('Something went wrong.')
  }
}
