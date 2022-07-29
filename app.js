import express from 'express'  // 框架
import cors from 'cors' // 解决跨域问题
import router from './router/user.js'  // 路由
import userinfoRouter from './router/userinfo.js' // 路由
import artCateRouter from './router/artcate.js' // 路由
import { expressjwt } from "express-jwt" // 将 JWT 字符串解析还原成 JSON 对象
import Joi from '@hapi/Joi' // 对客户端提交的数据进行规则验证
import jwtConfig from './config/jwt.js'
import bodyParser from 'body-parser'

const app = express()

// 跨域
app.use(cors())

// 配置解析表单数据的中间件

app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 注册 JWT 字符串解析
app.use(expressjwt({ secret: jwtConfig.jwtSecretKey, algorithms: ["HS256"] }).unless({ path: [/^\/api\//] }))

// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
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
  err.name === 'UnauthorizedError' ? res.send(data = { status: 400, message: '无效的token' }) : null
})

// 监听端口号
app.listen('8080', (req, res) => {
  console.log('开启8080端口号');
})
