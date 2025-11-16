import { getUserByEmail, getUserByUsername, updateUser as updateUserData } from '../../models/user.model.js'

import { validateUserPartial } from '../../validations/user.validations.js'

import { deleteImage, uploadImage } from '../../libs/cloudinary.js'
import { imageValidation } from '../../validations/image.validation.js'

export const updateUser = async (req, res) => {
  const user = req.user
  const resultValidationUser = validateUserPartial(req.body)
  if (!resultValidationUser.success) {
    return res.status(400).json(resultValidationUser.errors)
  }
  const { password, email, username } = resultValidationUser.data

  if (!password) {
    return res.status(400).json('Password is required to update user data.')
  }

  const isPasswordCorrect = await user.comparePassword(password, user.password)

  if (!isPasswordCorrect) {
    return res.status(401).json('Unauthorized incorrect password.')
  }

  // checking if username or email are being updated to existing ones
  if (username || email) {
    const mailExists = await getUserByEmail(email)
    const usernameExists = await getUserByUsername(username)
    if (mailExists || usernameExists) {
      return res.status(409).json('Username or email already in use.')
    }
  }

  let avatar = null

  if (req.files && req.files.avatar) {
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
    avatar = {
      url: result.secure_url,
      public_id: result.public_id
    }
  }

  const dataToUpdate = {
    ...resultValidationUser.data,
    avatar: avatar ?? user.avatar
  }

  try {
    const { password, ...dataUpdated } = await updateUserData(
      user,
      dataToUpdate
    )
    return res
      .status(200)
      .json({ message: 'User updated successfully.', user: dataUpdated })
  } catch (error) {
    console.error(error)
    return res.status(500).json('Server internal error.')
  }
}
