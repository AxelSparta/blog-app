import { Router, type IRouter } from 'express'
import { logout } from '../controllers/auth/logout.js'
import { signIn } from '../controllers/auth/signIn.js'
import { signUp } from '../controllers/auth/signUp.js'

const router: IRouter = Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/logout', logout)

export default router
