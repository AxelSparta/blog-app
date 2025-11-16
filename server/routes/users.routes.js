import { Router } from 'express'
import { dashboard } from '../controllers/users/dashboard.js'
// import { changePass } from '../controllers/users/changePass.js'
// import { deleteUser } from '../controllers/users/deleteUser.js'
// import { editAvatar } from '../controllers/users/editAvatar.js'
// import { editUsername } from '../controllers/users/editUsername.js'
// import { getUserInfo } from '../controllers/users/getUserInfo.js'
import { isAuth } from '../middlewares/isAuth.js'

const router = Router()

router.get('/dashboard', isAuth, dashboard)
// router.get('/userInfo/:id', getUserInfo)
// router.put('/username', isAuth, editUsername)
// router.put('/password', isAuth, changePass)
// router.put('/avatar', isAuth, editAvatar)
// router.delete('/delete/user', isAuth, deleteUser)

export default router
