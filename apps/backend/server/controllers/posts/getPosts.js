import { isValidObjectId } from 'mongoose'
import {
  getPosts as fetchPosts,
  getPostById,
  getPostsByCategory,
  getPostsByUserAndCategory,
  getPostsByUserId
} from '../../models/post.model.js'
import { categoryValidation } from '../../validations/post.validation.js'

export const getPosts = async (req, res) => {
  try {
    const { idPost, cat, userId } = req.query

    // 1️⃣ Filtrar por ID
    if (idPost) {
      if (!isValidObjectId(idPost)) {
        return res.status(400).json('Invalid post ID.')
      }
      const post = await getPostById(idPost)
      if (!post) return res.status(404).json('Post not found.')
      return res.json(post)
    }

    // 2️⃣ Filtrar por usuario + categoría
    if (userId && cat) {
      if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid user ID.' })
      }
      const { error, message } = categoryValidation(cat)
      if (error) {
        return res.status(400).json({ message })
      }

      const posts = await getPostsByUserAndCategory(userId, cat)
      return res.json(posts)
    }

    // 3️⃣ Filtrar solo por usuario
    if (userId) {
      if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid user ID.' })
      }

      const posts = await getPostsByUserId(userId)
      return res.json(posts)
    }

    // 4️⃣ Filtrar solo por categoría
    if (cat) {
      const { error, message } = categoryValidation(cat)
      if (error) {
        return res.status(400).json({ message })
      }
      const posts = await getPostsByCategory(cat)
      return res.json(posts)
    }

    // 5️⃣ Sin parámetros → devolver todos
    const posts = await fetchPosts()
    return res.json(posts)
  } catch (error) {
    console.error(error)
    return res.status(500).json('Something went wrong.')
  }
}
