import express from 'express'
import { getUsers,getUser, loginUser, registerUser, deleteUser } from '../controllers/user.controller'

const router = express.Router()

router.get('/all-users', getUsers)
router.get('/:id', getUser)
router.delete('/:id', deleteUser)
router.post('/register', registerUser)
router.post('/login', loginUser)

export default router