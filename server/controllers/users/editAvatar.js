import fs from 'fs-extra'
import { deleteImage, uploadImage } from '../../libs/cloudinary.js'
import { imageValidation } from '../../validations/image.validation.js'

export const editAvatar = async (req, res) => {
  try {
    const user = req.user

    if (!req.files || !req.files.avatar) {
      return res.status(400).json('Some data is missing.')
    }

    // image validation
    const validationResult = imageValidation(req.files.avatar, 2)
    if (validationResult.error) {
      return res.status(400).json(validationResult.message)
    }

    // eliminando avatar antiguo si es que existe
    if (user.avatar && user.avatar.public_id) {
      await deleteImage(user.avatar.public_id)
    }

    // subiendo imagen
    const result = await uploadImage(req.files.avatar.tempFilePath)
    // eliminando temp file
    await fs.remove(req.files.avatar.tempFilePath)
    const avatar = {
      url: result.secure_url,
      public_id: result.public_id
    }
    user.avatar = avatar
    await user.save()

    return res.status(201).json('Avatar changed successfully.')
  } catch (error) {
    return res.status(500).json(error.message)
  }
}
