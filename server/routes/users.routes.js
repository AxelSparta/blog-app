import { Router } from 'express'
import { dashboard } from '../controllers/users/dashboard.js'
import { deleteUser } from '../controllers/users/deleteUser.js'
import { updateUser } from '../controllers/users/editUser.js'
import { getUserInfo } from '../controllers/users/getUserInfo.js'
import { isAuth } from '../middlewares/isAuth.js'

const router = Router()

router.get('/', isAuth, dashboard)
router.get('/:id', getUserInfo)
router.put('/', isAuth, updateUser)
router.delete('/', isAuth, deleteUser)

export default router
