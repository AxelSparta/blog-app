import { deleteImage } from '../libs/cloudinary.js'
import Post from '../schemas/Post.js'

export const getPosts = async () => {
  const posts = await Post.find()
  return posts
}

export const getPostById = async id => {
  const post = await Post.findById(id)
  return post
}

export const getPostsByCategory = async category => {
  const posts = await Post.find({ category })
  return posts
}

export const getPostsByUserId = async userId => {
  const posts = await Post.find({ userId })
  return posts
}

export const getPostsByUserAndCategory = async (userId, category) => {
  const posts = await Post.find({ userId, category })
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

export const updatePostById = async (id, updatedData) => {
  const updatedPost = await Post.findByIdAndUpdate(id, updatedData, {
    new: true
  })
  return updatedPost
}

export const deletePostById = async id => {
  await Post.findByIdAndDelete(id)
}

export const deletePostsByUserId = async userId => {
  const posts = await getPosts(userId)
  posts.forEach(async post => {
    if (post.image && post.image.public_id) {
      await deleteImage(post.image.public_id)
    }
  })
  await Post.deleteMany({ userId })
}
