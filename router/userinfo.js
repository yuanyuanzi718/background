import express from 'express'
import Joi from 'joi';
import { getUserInfo, updateUserInfo, updatePassword, updateAvatar } from '../router_handler/userinfo.js'
// 导入需要验证规则对象
// import { schema, update_userinfo_schema, update_password_schema } from '../schema/user.js'

const router = express.Router()
const oldPwd = Joi.string().alphanum().min(1).max(10).required()

router.get('/userinfo', getUserInfo)
router.post('/userinfo', updateUserInfo)
router.post('/updatepwd', (req, res, next) => {
  const schema = Joi.object({
    oldPwd: Joi.string().alphanum().min(1).max(10).required(),
    newPwd: Joi.not(Joi.ref('oldPwd')).concat(oldPwd)
  });
  const { error, value } = schema.validate(req.body);
  if (error !== undefined) {
    console.log('校验失败');
  }
  next()
}, updatePassword)
// 更新用户头像
router.post('/update/avatar', updateAvatar)


export default router