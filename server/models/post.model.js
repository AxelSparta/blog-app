import Post from '../schemas/Post.js'

export const getPosts = async id => {
  let posts
  if (id) {
    posts = await Post.find({ userId: id })
  } else {
    posts = await Post.find()
  }
  return posts
}

export const getPostByCategory = async category => {
  const posts = await Post.find({ category })
  return posts
}

export const createNewPost = async ({
  title,
  content,
  image,
  category,
  userId
}) => {
  const newPost = await Post.create({
    title,
    content,
    image,
    category,
    userId
  })
  await newPost.save()
}

export const getPostById = async id => {
  const post = await Post.findById(id)
  return post
}

export const updatePostById = async (id, updatedData) => {
  const updatedPost = await Post.findByIdAndUpdate(id, updatedData, {
    new: true
  })
  return updatedPost
}

export const deletePostById = async id => {
  await Post.findByIdAndDelete(id)
}
