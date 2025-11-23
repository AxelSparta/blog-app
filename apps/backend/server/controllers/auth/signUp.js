import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../../envConfig.js'
import { createUser, getUserByEmail, getUserByUsername } from '../../models/user.model.js'
import { validateUserSignUp } from '../../validations/user.validations.js'

export const signUp = async (req, res) => {
  const { success, data, errors } = validateUserSignUp(req.body)

  if (!success) {
    return res.status(400).json({ errors })
  }

  const { username, password, email } = data

  // CHECK EXISTING USER
  try {
    const resultByEmail = await getUserByEmail(email)
    const resultByUsername = await getUserByUsername(username)
    if (resultByEmail || resultByUsername) {
      return res.status(409).json('username or email already exists.')
    }
  } catch (error) {
    console.error(error.message)
    return res.status(500).json('Error creating user.')
  }

  // CREATING NEW USER
  try {
    const newUserId = await createUser({ username, email, password })
    const token = jwt.sign({ id: newUserId }, JWT_KEY, {
      expiresIn: '14d'
    })
    return res
      .cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
        sameSite: 'none',
        secure: true
      })
      .status(201)
      .json('User has been created.')
  } catch (error) {
    console.error(error.message)
    return res.status(500).json('Error creating user.')
  }
}
