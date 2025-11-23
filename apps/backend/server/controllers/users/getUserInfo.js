import { getUserById } from '../../models/user.model.js'

export const getUserInfo = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400).json('Some data is missing.')

    const user = await getUserById(id)
    if (!user) return res.status(404).json('User not found')
    return res.json({
      username: user.username,
      avatar: user.avatar
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json('Server internal error.')
  }
}
