import { validatePassword } from '../../validations/user.validations.js'

export const changePass = async (req, res) => {
  try {
    const { password, newPassword } = req.body
    const user = req.user

    if (!password || !newPassword) { return res.status(400).json('Some data is missing.') }

    if (!validatePassword(newPassword)) { return res.status(400).json('Password must contain one number, one uppercase letter and one lowercase letter.') }

    const isPasswordCorrect = await user.comparePassword(
      password,
      user.password
    )

    if (!isPasswordCorrect) return res.status(400).json('Incorrect password.')

    const newPassHash = await user.encryptPassword(newPassword)

    user.password = newPassHash

    await user.save()

    return res.status(201).json('Password changed successfully.')
  } catch (error) {
    return res.status(500).json(error.message)
  }
}
