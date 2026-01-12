import { type Response } from 'express'
import fs from 'fs-extra'
import { deleteImage, uploadImage } from '../../libs/cloudinary.js'
import { getPostById, updatePostById } from '../../models/post.model.js'
import { imageValidation, partialPostValidation, sanitize } from '@repo/validations'
import type { AuthRequest } from '../../middlewares/isAuth.js'
import type { UploadedFile } from 'express-fileupload'

export const editPost = async (
  req: AuthRequest,
  res: Response
): Promise<Response | void> => {
  const resultPostValidation = partialPostValidation(req.body)
  if (resultPostValidation.error) {
    return res.status(400).json(resultPostValidation.message)
  }

  const data = resultPostValidation.data!
  const sanitizedContent = data.content ? sanitize(data.content) : undefined

  const user = req.user
  const { id: blogId } = req.params
  if (!blogId) {
    return res.status(400).json('Post ID is required.')
  }

  try {
    let image: { url: string; public_id: string } | null = null
    const postToEdit = await getPostById(blogId)
    if (!postToEdit) return res.status(404).json('Post not found.')

    if (postToEdit.userId !== user._id.toString()) {
      return res.status(401).json('Not authorized.')
    }

    if (req.files && req.files.image) {
      if (postToEdit.image?.public_id) {
        await deleteImage(postToEdit.image.public_id!)
      }
      const imageFile = req.files.image as UploadedFile
      // img validation
      const imgValidationResult = imageValidation(imageFile, 2)
      if (imgValidationResult.error) {
        return res.status(400).json(imgValidationResult.message)
      }
      // subiendo imagen
      const result = await uploadImage(imageFile.tempFilePath)
      // eliminando temp file
      await fs.remove(imageFile.tempFilePath)
      image = {
        url: result.secure_url,
        public_id: result.public_id
      }
    }

    const updatedData = {
      ...data,
      ...(sanitizedContent ? { content: sanitizedContent } : {}),
      image: image || postToEdit.image
    }

    await updatePostById(blogId!, updatedData)
    return res.status(200).json('Post updated successfully.')
  } catch (error) {
    console.error(error)
    return res.status(500).json('Something went wrong.')
  }
}
