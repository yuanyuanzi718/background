import db from '../db/index.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import jwtConfig from '../config/jwt.js'

// 注册
export const regUser = (req, res) => {
  const userinfo = req.body
  if (!userinfo.username || !userinfo.password) {
    return res.send({ status: 1, message: '用户名或密码不能为空!' })
  }
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, userinfo.username, (err, results) => {
    err ? res.send({ status: 1, message: err.message }) : null
    results.length > 0 ? res.send({ status: 1, message: '用户名被占用,请更换其它用户名' }) : null
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    const sql = 'insert into ev_users set ?'
    db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
      err ? res.end({ status: 1, message: err.message }) : null
      results.affectedRows !== 1 ? res.send({ status: 1, message: '用户注册失败,请稍后再试' }) : null
      res.send({ status: 0, message: '注册成功' })
    })
  })
}

// 登录
export const login = (req, res) => {
  const userinfo = req.body
  console.log(userinfo);
  const sql = `select * from ev_users where username=?`
  db.query(sql, userinfo.username, (err, results) => {
    err ? res.send(err) : null
    if (results.length !== 1) return res.send({ data: { status: 400, message: '登录失败' } })
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if (!compareResult) return res.send({ status: 400, message: '登录失败' })
    const user = { ...results[0], password: '', user_pic: '' }
    const tokenStr = jwt.sign(user, jwtConfig.jwtSecretKey, { expiresIn: jwtConfig.expiresIn })
    if (userinfo.remember) {
      res.send({
        data: {
          status: 200,
          message: "登陆成功",
          token: `Bearer ${tokenStr}`,
          remember: true,
        }
      })
    } else {
      res.send({
        data: {
          status: 200,
          message: "登陆成功",
          token: `Bearer ${tokenStr}`,
          remember: false,
        }
      })
    }
  })
}

