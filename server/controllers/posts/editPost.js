import fs from 'fs-extra'
import { deleteImage, uploadImage } from '../../libs/cloudinary.js'
import Post from '../../models/Post.js'
import { imageValidation } from '../../validations/image.validation.js'
import {
  categoryValidation,
  contentValidation,
  titleValidation
} from '../../validations/post.validation.js'

export const editPost = async (req, res) => {
  try {
    const user = req.user
    const { title, content, category, image } = req.body
    const { id } = req.params

    if (!title || !content || !category) { return res.status(400).json('Some data is missing.') }

    const titleValidationResult = titleValidation(title)
    if (titleValidationResult.error) { return res.status(400).json(titleValidationResult.message) }

    const contValidationResult = contentValidation(content)
    if (contValidationResult.error) { return res.status(400).json(contValidationResult.message) }

    const catValidationResult = categoryValidation(category)
    if (catValidationResult.error) { return res.status(400).json(catValidationResult.message) }

    const postToEdit = await Post.findById(id)
    if (!postToEdit) return res.status(404).json('Post not found.')
    if (postToEdit.userId !== user.id) { return res.status(401).json('Not authorized.') }

    if (image === 'null') {
      // eliminando imagen anterior si existe antes de subir la nueva
      if (postToEdit.image && postToEdit.image.public_id) {
        await deleteImage(postToEdit.image.public_id)
      }
      postToEdit.image = null
    }

    if (req.files && req.files.image) {
      // img validation
      const imgValidationResult = imageValidation(req.files.image, 2)
      if (imgValidationResult.error) { return res.status(400).json(imgValidationResult.message) }
      // subiendo imagen
      const result = await uploadImage(req.files.image.tempFilePath)
      // eliminando temp file
      await fs.remove(req.files.image.tempFilePath)
      postToEdit.image = {
        url: result.secure_url,
        public_id: result.public_id
      }
    }
    postToEdit.title = title
    postToEdit.content = content
    postToEdit.category = category

    await postToEdit.save()
    return res.status(200).json('Post has been deleted.')
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
