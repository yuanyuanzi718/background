import express from 'express'
import { regUser, login } from '../router_handler/user.js'
const router = express.Router()

// 注册新用户
router.post('/reguser', regUser)

// 登录
router.post('/login', login)

export default router
