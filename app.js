import express from 'express'
import cors from 'cors'
import router from './router/user.js'
import userinfoRouter from './router/userinfo.js'
import artCateRouter from './router/artcate.js'
import { expressjwt } from "express-jwt"
import jwtConfig from './config/jwt.js'
import Joi from '@hapi/Joi'

const app = express()
app.use(cors())  // 跨域
app.use(express.urlencoded({ extended: false })) // 配置解析表单数据的中间件

// 注册 JWT 字符串解析
app.use(expressjwt({ secret: jwtConfig.jwtSecretKey, algorithms: ["HS256"] }).unless({ path: [/^\/api\//] }))

// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
  // status 默认值为 1，表示失败的情况
  // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

// 使用 router
app.use('/api', router)
app.use('/my', userinfoRouter)
app.use('/my/article', artCateRouter)

// 定义错误级别中间件
app.use((err, req, res, next) => {
  if (err instanceof Joi.ValidationError) return res.cc(err)
  err.name === 'UnauthorizedError' ? res.send({ status: 401, message: '无效的token' }) : null
})

// 监听端口号
app.listen('8080', (req, res) => {
  console.log('开启8080端口号');
})