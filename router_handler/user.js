import db from '../db/index.js'
import bcrypt from 'bcryptjs' // 密码加密包
import jwt from 'jsonwebtoken'
import jwtConfig from '../config/jwt.js'

export const regUser = (req, res) => {
  const userinfo = req.body
  if (!userinfo.username || !userinfo.password) {
    return res.send({ status: 1, message: '用户名或密码不能为空!' })
  }
  // 对表单中的数据,进行合法性的校验
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, userinfo.username, (err, results) => {
    err ? res.send({ status: 1, message: err.message }) : null
    results.length > 0 ? res.send({ status: 1, message: '用户名被占用,请更换其它用户名' }) : null
    // 校验成功,给密码加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // 添加进数据库
    const sql = 'insert into ev_users set ?'
    db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
      err ? res.end({ status: 1, message: err.message }) : null
      results.affectedRows !== 1 ? res.send({ status: 1, message: '用户注册失败,请稍后再试' }) : null
      // 注册成功
      res.send({ status: 0, message: '注册成功' })
    })
  })

}

export const login = (req, res) => {
  const userinfo = req.body
  const sql = `select * from ev_users where username=?`
  db.query(sql, userinfo.username, (err, results) => {
    err ? res.send(err) : null
    results.length !== 1 ? res.send('登录失败') : null
    // 判断密码是否正确
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    !compareResult ? res.send('登录失败') : null
    // 在服务端生成 Token 的字符串
    const user = { ...results[0], password: '', user_pic: '' }
    const tokenStr = jwt.sign(user, jwtConfig.jwtSecretKey, { expiresIn: jwtConfig.expiresIn })
    res.send({
      status: 0,
      message: "登陆成功",
      token: `Bearer ${tokenStr}`,
    })
  })
}