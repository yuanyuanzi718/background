import Joi from 'joi';

// 定义用户名和密码的验证规则
// const username = Joi.string().alphanum().min(1).max(10).required()
// const password = Joi.string().pattern(/^[\S]{6,12}$/).required()
// const id = Joi.number().integer().min(1).required()
// const nickname = Joi.string().required()
// const email = Joi.string().email().required()

// 定义表单验证规则
export const schema = Joi.object({
  // username: Joi.string().alphanum().min(1).max(10).required().error(new
  //   Error("账号不规范")),
  // password: Joi.string().pattern(/^[\S]{6,12}$/).required().error(new
  //   Error("账号不规范")),
  // id: Joi.number().integer().min(1).required().error(new
  //   Error("账号不规范")),
  // nickname: Joi.string().required().error(new
  //   Error("账号不规范")),
  // email: Joi.string().email().required().error(new
  //   Error("账号不规范")),
  // oldPwd: Joi.string().alphanum().min(1).max(10).required().error(new
  //   Error("账号不规范")),
  // newPwd: Joi.not(Joi.ref('oldPwd')).concat(oldPwd).error(new
  //   Error("账号不规范"))
});
// export const reg_login_schema = {
//   body: {
//     username,
//     password
//   }
// }
// export const update_userinfo_schema = {
//   body: {
//     id,
//     nickname,
//     email
//   }
// }
// export const update_password_schema = {
//   body: {
//     oldPwd: password,
//     newPwd: Joi.not(Joi.ref('oldPwd')).concat(password),
//   }
// }
