export const dashboard = async (req, res) => {
  try {
    const { _id, username, email, avatar } = req.user
    return res.json({ _id, username, email, avatar })
  } catch (error) {
    console.error(error)
    return res.status(500).json('Server internal error.')
  }
}
