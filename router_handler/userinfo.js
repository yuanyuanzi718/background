import db from '../db/index.js'
import bcrypt from 'bcryptjs'

// 获取用户信息
export const getUserInfo = (req, res) => {
  const sql = `select id, username,nickname,email,user_pic from ev_users where id=?`
  db.query(sql, req.auth.id, (err, results) => {
    err ? res.send({ status: 1, message: err.message }) : null
    results.length !== 1 ? res.send({ status: 1, message: '获取用户信息失败' }) : null
    res.send({ status: 0, message: '获取用户信息成功', data: results[0] })
  })
}

// 更新用户信息
export const updateUserInfo = (req, res) => {
  const sql = `update ev_users set ? where id=?`
  db.query(sql, [req.body, req.body.id], (err, results) => {
    err ? res.send({ status: 1, message: err.message }) : null
    results.affectedRows !== 1 ? res.send({ status: 1, message: '获取用户信息失败' }) : null
    res.send({ status: 0, message: '更新用户信息成功' })
  })
}

// 修改密码
export const updatePassword = (req, res) => {
  const sql = `select * from ev_users where id=?`
  db.query(sql, req.auth.id, (err, results) => {
    err ? res.send({ status: 1, message: err }) : null
    results.length !== 1 ? res.send({ status: 1, message: '用户不存在' }) : null
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.send({ status: 1, message: '原密码错误' })
    const sql = `update ev_users set password=? where id=?`
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    db.query(sql, [newPwd, req.auth.id], (err, results) => {
      err ? res.send({ status: 1, message: err }) : null
      results.affectedRows !== 1 ? res.send({ status: 1, message: '更新密码失败' }) : null
      res.send({ status: 0, message: '修改密码成功' })
    })
  })
}

// 更新头像
export const updateAvatar = (req, res) => {
  const sql = `update ev_users set user_pic=? where id=?`
  db.query(sql, [req.body.avatar, req.auth.id], (err, results) => {
    if (err) return res.send(err)
    if (results.affectedRows !== 1) return res.send('更换头像失败！')
    res.send({ status: 0, message: '更新头像成功' })
  })
}