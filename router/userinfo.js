import express from 'express'
const router = express.Router()
import { getUserInfo, updateUserInfo, updatePassword, updateAvatar } from '../router_handler/userinfo.js'

// 导入需要验证规则对象
import { update_userinfo_schema, update_password_schema, update_avatar_schema } from '../schema/userinfoRule.js'
import { expressJoi } from '../schema/expressJoi.js'

// 获取用户基本信息的路由
router.get('/userinfo', getUserInfo)

// 更新用户信息的路由
router.post('/userinfo', expressJoi(update_userinfo_schema), updateUserInfo)

// 更新密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), updatePassword)

// 更新用户头像
router.post('/update/avatar', expressJoi(update_avatar_schema), updateAvatar)

export default router