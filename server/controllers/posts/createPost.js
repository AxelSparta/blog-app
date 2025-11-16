import fs from 'fs-extra'
import { uploadImage } from '../../libs/cloudinary.js'
import { createNewPost } from '../../models/post.model.js'
import { imageValidation } from '../../validations/image.validation.js'
import { postValidation } from '../../validations/post.validation.js'

export const createPost = async (req, res) => {
  const user = req.user
  const postValidationResult = postValidation(req.body)

  if (postValidationResult.error) {
    return res.status(400).json(postValidationResult.message)
  }

  const { title, content, category } = postValidationResult.data

  let image = null

  if (req.files?.image) {
    // img validation
    const imgValidationResult = imageValidation(req.files.image, 2)
    if (imgValidationResult.error) {
      return res.status(400).json(imgValidationResult.message)
    }

    try {
      // subiendo imagen
      const result = await uploadImage(req.files.image.tempFilePath)
      // eliminando temp file
      await fs.remove(req.files.image.tempFilePath)
      image = {
        url: result.secure_url,
        public_id: result.public_id
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json('Error uploading image.')
    }
  }

  try {
    await createNewPost({
      title,
      content,
      image,
      category,
      userId: user.id
    })

    return res.status(201).json('Post created.')
  } catch (error) {
    console.error(error)
    return res.status(500).json('Something went wrong.')
  }
}
