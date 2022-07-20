import db from '../db/index.js'
import bcrypt from 'bcryptjs' // 密码加密包

export const getUserInfo = (req, res) => {
  const sql = `select id, username,nickname,email,user_pic from ev_users where id=?`
  db.query(sql, req.auth.id, (err, results) => {
    err ? res.send({ status: 1, message: err.message }) : null
    results.length !== 1 ? res.send({ status: 1, message: '获取用户信息失败' }) : null
    // 获取成功
    res.send({ status: 0, message: '获取用户信息成功', data: results[0] })
  })
}

// update
export const updateUserInfo = (req, res) => {
  const sql = `update ev_users set ? where id=?`
  db.query(sql, [req.body, req.body.id], (err, results) => {
    err ? res.send({ status: 1, message: err.message }) : null
    results.affectedRows !== 1 ? res.send({ status: 1, message: '获取用户信息失败' }) : null
    // 获取成功
    res.send({ status: 0, message: '更新用户信息成功' })
  })
}
// updatePassword
export const updatePassword = (req, res) => {
  const sql = `select * from ev_users where id=?`
  // id查询用户信息
  db.query(sql, req.auth.id, (err, results) => {
    err ? res.send({ status: 1, message: err }) : null
    results.length !== 1 ? res.send({ status: 1, message: '用户不存在' }) : null
    // 判断旧密码是否正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.send({ status: 1, message: '原密码错误' })
    // 存新密码
    const sql = `update ev_users set password=? where id=?`
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    db.query(sql, [newPwd, req.auth.id], (err, results) => {
      err ? res.send({ status: 1, message: err }) : null
      results.affectedRows !== 1 ? res.send({ status: 1, message: '更新密码失败' }) : null
      // 更新成功
      res.send({ status: 0, message: '修改密码成功' })
    })
  })
}

// updateAvatar
export const updateAvatar = (req, res) => {
  // 1. 定义更新头像的 SQL 语句
  const sql = `update ev_users set user_pic=? where id=?`
  // 2. 调用 db.query() 执行 SQL 语句
  db.query(sql, [req.body.avatar, req.auth.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.send(err)
    // 影响的行数是否等于 1
    if (results.affectedRows !== 1) return res.send('更换头像失败！')
    // 成功
    res.send({ status: 0, message: '更新头像成功' })
  })
}