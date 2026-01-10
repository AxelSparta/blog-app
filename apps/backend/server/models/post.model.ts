import { deleteImage } from '../libs/cloudinary.js'
import Post from '../schemas/Post.js'
import type { IPost } from '../schemas/Post.js'

export const getPosts = async (): Promise<IPost[]> => {
  const posts = await Post.find()
  return posts
}

export const getPostById = async (id: string): Promise<IPost | null> => {
  const post = await Post.findById(id)
  return post
}

export const getPostsByCategory = async (category: string): Promise<IPost[]> => {
  const posts = await Post.find({ category })
  return posts
}

export const getPostsByUserId = async (userId: string): Promise<IPost[]> => {
  const posts = await Post.find({ userId })
  return posts
}

export const getPostsByUserAndCategory = async (
  userId: string,
  category: string
): Promise<IPost[]> => {
  const posts = await Post.find({ userId, category })
  return posts
}

export const createNewPost = async ({
  title,
  content,
  image,
  category,
  userId
}: {
  title: string
  content: string
  image?: { url?: string; public_id?: string } | null
  category: string
  userId: string
}): Promise<void> => {
  const newPost = await Post.create({
    title,
    content,
    image,
    category,
    userId
  })
  await newPost.save()
}

export const updatePostById = async (
  id: string,
  updatedData: Partial<IPost>
): Promise<IPost | null> => {
  const updatedPost = await Post.findByIdAndUpdate(id, updatedData, {
    new: true
  })
  return updatedPost
}

export const deletePostById = async (id: string): Promise<void> => {
  await Post.findByIdAndDelete(id)
}

export const deletePostsByUserId = async (userId: string): Promise<void> => {
  const posts = await getPosts()
  posts.forEach(async post => {
    if (post.image && post.image.public_id) {
      await deleteImage(post.image.public_id)
    }
  })
  await Post.deleteMany({ userId })
}
