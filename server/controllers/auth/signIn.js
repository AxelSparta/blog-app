import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../../envConfig.js'
import User from '../../schemas/User.js'
import {
  validatePassword,
  validateUsername
} from '../../validations/user.validations.js'

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json('Some data is missing.')
    }

    if (!validatePassword(password)) {
      return res.status(400).json('Invalid password.')
    }

    if (!validateUsername(username)) {
      return res.status(400).json('Invalid username.')
    }

    const user = await User.findOne({ username })
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
    return res.status(500).json(error.message)
  }
}
