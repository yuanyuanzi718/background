import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())


// 监听端口号
app.listen('8080', (req, res) => {
  console.log('开启8080端口号');
})