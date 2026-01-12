import { type Response } from 'express'
import { uploadImage } from '../../libs/cloudinary.js'
import { createNewPost } from '../../models/post.model.js'
import { imageValidation, postValidation, sanitize } from '@repo/validations'
import type { AuthRequest } from '../../middlewares/isAuth.js'
import type { UploadedFile } from 'express-fileupload'

export const createPost = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  const user = req.user
  const postValidationResult = postValidation(req.body)

  if (postValidationResult.error) {
    return res.status(400).json(postValidationResult.message)
  }

  const { title, content, category } = postValidationResult.data!
  const sanitizedContent = sanitize(content)

  let image: { url: string; public_id: string } | null = null

  if (req.files?.image) {
    const imageFile = req.files.image as UploadedFile
    // img validation
    const imgValidationResult = imageValidation(imageFile, 2)
    if (imgValidationResult.error) {
      return res.status(400).json(imgValidationResult.message)
    }

    try {
      // subiendo imagen
      const result = await uploadImage(imageFile.tempFilePath)
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
      content: sanitizedContent,
      image,
      category,
      userId: user._id.toString()
    })

    return res.status(201).json('Post created.')
  } catch (error) {
    console.error(error)
    return res.status(500).json('Something went wrong.')
  }
}
