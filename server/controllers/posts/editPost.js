import fs from 'fs-extra'
import { deleteImage, uploadImage } from '../../libs/cloudinary.js'
import { getPostById, updatePostById } from '../../models/post.model.js'
import { imageValidation } from '../../validations/image.validation.js'
import { partialPostValidation } from '../../validations/post.validation.js'

export const editPost = async (req, res) => {
  const restultPostValidation = partialPostValidation(req.body)

  if (restultPostValidation.error) {
    return res.status(400).json(restultPostValidation.message)
  }

  const user = req.user
  const { id: blogId } = req.params

  try {
    let image = null
    const postToEdit = await getPostById(blogId)
    if (!postToEdit) return res.status(404).json('Post not found.')

    if (postToEdit.userId !== user.id) {
      return res.status(401).json('Not authorized.')
    }

    if (req.files && req.files.image) {
      await deleteImage(postToEdit.image.public_id)
      // img validation
      const imgValidationResult = imageValidation(req.files.image, 2)
      if (imgValidationResult.error) {
        return res.status(400).json(imgValidationResult.message)
      }
      // subiendo imagen
      const result = await uploadImage(req.files.image.tempFilePath)
      // eliminando temp file
      await fs.remove(req.files.image.tempFilePath)
      image = {
        url: result.secure_url,
        public_id: result.public_id
      }
    }

    const updatedData = {
      ...restultPostValidation.data,
      image: image || postToEdit.image
    }

    await updatePostById(blogId, updatedData)
    return res.status(200).json('Post updated successfully.')
  } catch (error) {
    console.error(error)
    return res.status(500).json('Something went wrong.')
  }
}
