import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../../envConfig.js'
import { getUserByUsername } from '../../models/user.model.js'
import { validateUserSignIn } from '../../validations/user.validations.js'

export const signIn = async (req, res) => {
  const { success, errors, data } = validateUserSignIn(req.body)

  if (!success) {
    return res.status(400).json(errors)
  }

  const { username, password } = data

  try {
    const user = await getUserByUsername(username)

    if (!user) {
      return res.status(404).json('Username or password is not correct.')
    }

    const isPasswordCorrect = await user.comparePassword(
      password,
      user.password
    )

    if (!isPasswordCorrect) {
      return res.status(404).json('Username or password is not correct.')
    }

    const token = jwt.sign({ id: user._id }, JWT_KEY, {
      expiresIn: '14d'
    })

    return res
      .cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
        sameSite: 'none',
        secure: true
      })
      .status(200)
      .json('Logged in.')
  } catch (error) {
    console.error(error)
    return res.status(500).json('Internal server error.')
  }
}
