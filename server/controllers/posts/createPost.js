import { uploadImage } from '../../libs/cloudinary.js'
import { imageValidation } from '../../validations/image.validation.js'
import fs from 'fs-extra'
import Post from '../../models/Post.js'
import {
  categoryValidation,
  contentValidation,
  titleValidation
} from '../../validations/post.validation.js'

export const createPost = async (req, res) => {
  try {
    const user = req.user
    const { title, content, category } = req.body
    // VALIDATIONS
    if (!title || !content || !category) { return res.status(400).json('Some data is missing.') }

    const titleResultValidation = titleValidation(title)
    if (titleResultValidation.error) { return res.status(400).json(titleResultValidation.message) }
    const contResultValidation = contentValidation(content)
    if (contResultValidation.error) { return res.status(400).json(contResultValidation.message) }

    const catResultValidation = categoryValidation(category)
    if (catResultValidation.error) { return res.status(400).json(catResultValidation.message) }

    let image
    if (req.files && req.files.image) {
      // img validation
      const imgValidationResult = imageValidation(req.files.image, 2)
      if (imgValidationResult.error) { return res.status(400).json(imgValidationResult.message) }
      // subiendo imagen
      const result = await uploadImage(req.files.image.tempFilePath)
      // eliminando temp file
      await fs.remove(req.files.image.tempFilePath)
      image = {
        url: result.secure_url,
        public_id: result.public_id
      }
    }
    await Post.create({
      title,
      content,
      image,
      category,
      userId: user.id
    })
    return res.status(201).json('Post created.')
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
