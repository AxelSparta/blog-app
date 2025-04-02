import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../../config.js'
import User from '../../models/User.js'
import {
  validateEmail,
  validatePassword,
  validateUsername
} from '../../validations/user.validations.js'

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return res.status(400).json('Some data is missing')
    }
    // CHECK EXISTING USER
    // by username
    const resultUsername = await User.find({ username })
    if (resultUsername.length !== 0) {
      return res.status(409).json('Username already taken.')
    }
    // by email
    const resultEmail = await User.find({ email })
    if (resultEmail.length !== 0) {
      return res.status(409).json('Email already taken.')
    }

    // VALIDATIONS

    if (!validateUsername(username)) {
      return res
        .status(400)
        .json(
          'Username must be between 8 and 30 characters, and must contain only letters, numbers and underscores.'
        )
    }

    if (!validatePassword(password)) {
      return res
        .status(400)
        .json(
          'Password must be between 8 and 30 characters, and must contain one number, one uppercase letter and one lowercase letter.'
        )
    }

    if (!validateEmail(email)) return res.status(400).json('Invalid email.')

    // creando usuario
    const user = new User({
      username,
      password,
      email
    })
    // el argumento del método de instancia tiene que ser una prop del objeto en sí
    user.password = await user.encryptPassword(user.password)
    await user.save()
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
      .status(201)
      .json('User has been created.')
  } catch (error) {
    res.status(500).json(error.message)
  }
}
