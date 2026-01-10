import { Router, type IRouter } from 'express'
import { createPost } from '../controllers/posts/createPost.js'
import { deletePost } from '../controllers/posts/deletePost.js'
import { editPost } from '../controllers/posts/editPost.js'
import { getPosts } from '../controllers/posts/getPosts.js'
import { isAuth } from '../middlewares/isAuth.js'

const router: IRouter = Router()

router.get('/', getPosts)

// router.get('/user/:id', getPosts)
// router.get('/cat/', getPostsCat)
// router.get('/:id', getPost)

router.post('/', isAuth, createPost)
router.put('/:id', isAuth, editPost)
router.delete('/:id', isAuth, deletePost)

export default router
