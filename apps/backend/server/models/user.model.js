import User from '../schemas/User.js'

export const getUserByUsername = async username => {
  try {
    const resultUsername = await User.find({ username })
    if (resultUsername.length === 0) {
      return null
    }
    return resultUsername[0]
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching user by username')
  }
}

export const getUserByEmail = async email => {
  try {
    const resultEmail = await User.find({ email })
    if (resultEmail.length === 0) {
      return null
    }
    return resultEmail[0]
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching user by email')
  }
}

export const getUserById = async id => {
  try {
    const user = await User.findById(id)
    return user
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching user by ID')
  }
}

export const createUser = async ({ username, email, password }) => {
  try {
    const user = new User({
      username,
      password,
      email
    })

    user.password = await user.encryptPassword(user.password)
    await user.save()

    return user._id
  } catch (error) {
    console.error(error)
    throw new Error('Error creating new user')
  }
}

export const updateUser = async (user, data) => {
  const { newPassword, ...newData } = data

  if (newPassword) {
    user.password = await user.encryptPassword(newPassword)
  }
  try {
    const result = await User.findByIdAndUpdate(
      user._id,
      {
        ...newData,
        password: user.password
      },
      { new: true }
    )
    return result._doc
  } catch (error) {
    console.error(error)
    throw new Error('Error changing password')
  }
}
