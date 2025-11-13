import { validateUsername } from '../../validations/user.validations.js'

export const editUsername = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = req.user

    if (!username || !password) {
      return res.status(400).json('Some data is missing.')
    }

    // username validation
    if (!validateUsername(username)) {
      return res
        .status(400)
        .json(
          'Username must be between 8 and 30 characters, and must contain only letters, numbers and underscores.'
        )
    }

    const isPasswordCorrect = await user.comparePassword(
      password,
      user.password
    )

    if (!isPasswordCorrect) return res.status(400).json('Incorrect password.')

    if (username === user.username) {
      return res.status(400).json('The username is the same.')
    }

    user.username = username

    await user.save()

    return res.status(201).json('Username changed successfully.')
  } catch (error) {
    return res.status(500).json(error.message)
  }
}
