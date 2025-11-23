import { Router } from 'express'
import { createPost } from '../controllers/posts/createPost.js'
import { deletePost } from '../controllers/posts/deletePost.js'
import { editPost } from '../controllers/posts/editPost.js'
import { getPost } from '../controllers/posts/getPost.js'
import { getPosts } from '../controllers/posts/getPosts.js'
import { getPostsCat } from '../controllers/posts/getPostsCat.js'

import { isAuth } from '../middlewares/isAuth.js'

const router = Router()

router.get('/', getPosts)
router.get('/user/:id', getPosts)
router.get('/:id', getPost)
router.get('/cat', getPostsCat)

router.post('/', isAuth, createPost)
router.put('/:id', isAuth, editPost)
router.delete('/:id', isAuth, deletePost)

export default router
