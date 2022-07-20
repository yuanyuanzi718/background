// 导入定义验证规则的包
import Joi from '@hapi/Joi'

// 定义用户名和密码的验证规则
const username = Joi.string().alphanum().min(1).max(10).required()
const password = Joi.string().pattern(/^[\S]{6,12}$/).required()
const id = Joi.number().integer().min(1).required()
const nickname = Joi.string().required()
const user_email = Joi.string().email().required()

// 定义验证 avatar 头像的验证规则
const avatar = Joi.string().dataUri().required()
// 定义验证注册和登录表单数据的规则对象
export const reg_login_schema = {
  body: {
    username,
    password,
  },
}
// 验证规则对象 - 更新用户基本信息
export const update_userinfo_schema = {
  // 需要对 req.body 里面的数据进行验证
  body: {
    id,
    nickname,
    email: user_email,
  },
}
// 验证规则对象 - 更新密码
export const update_password_schema = {
  body: {
    oldPwd: password,
    newPwd: Joi.not(Joi.ref('oldPwd')).concat(password),
  },
}
// 验证规则对象 - 更新头像
export const update_avatar_schema = {
  body: {
    avatar
  }
}


