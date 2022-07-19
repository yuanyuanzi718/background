import express from 'express'
import cors from 'cors'
import router from './router/user.js'
import userinfoRouter from './router/userinfo.js'
import db from './db/index.js'
import { expressjwt } from "express-jwt"
import jwtConfig from './config/jwt.js'



const app = express()
app.use(cors())  // 跨域
app.use(express.urlencoded({ extended: false })) // 配置解析表单数据的中间件

// 注册 JWT 字符串解析
app.use(expressjwt({ secret: jwtConfig.jwtSecretKey, algorithms: ["HS256"] }).unless({ path: [/^\/api\//] }))
// 使用 router
app.use('/api', router)
app.use('/my', userinfoRouter)

// 定义错误级别中间件
app.use((err, req, res, next) => {
  // 错误由 token 解析失败导致的
  err.name === 'UnauthorizedError' ? res.send({ status: 401, message: '无效的token' }) : null
})

// 查询数据库
db.query('select * from ev_users', (err, results) => {
  if (err) return console.log(err.message);
  console.log(results);
})


// 监听端口号
app.listen('8080', (req, res) => {
  console.log('开启8080端口号');
})