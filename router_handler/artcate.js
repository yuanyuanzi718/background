import db from '../db/index.js'
import bcrypt from 'bcryptjs' // 密码加密包
import jwt from 'jsonwebtoken'
import jwtConfig from '../config/jwt.js'

export const getArticleCates = (req, res) => {
  const sql = `select * from ev_artide_cate where is_delete=0 order by id asc`
  db.query(sql, (err, results) => {
    if (err) return res.send(err)
    res.send({
      status: 0,
      message: '获取文章分类列表成功',
      data: results
    })
  })
}

export const addArticleCates = (req, res) => {
  // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
  const sql = `select * from ev_artide_cate where name=? or alias=?`
  // 执行查重操作
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.send(err)
    // 判断 分类名称 和 分类别名 是否被占用
    if (results.length === 2) return res.send('分类名称与别名被占用，请更换后重试!')
    // 分别判断 分类名称 和 分类别名 是否被占用
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.send('分类名称与分类别名被占用')
    if (results.length === 1 && results[0].name === req.body.name) return res.send('分类名称被占用，请更换后重试!')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.send('分类别名被占用，请更换后重试!')
    // 新增 SQL 语句
    const sql = `insert into ev_artide_cate set ?`
    db.query(sql, req.body, (err, results) => {
      // SQL 语句执行失败
      if (err) return res.send(err)
      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.send('新增文章分类失败!')
      // 新增文章分类成功
      res.send({
        status: 0,
        message: '获取文章分类列表成功'
      })
    })
  })
}
// 删除
export const deleteCateById = (req, res) => {
  const sql = 'update ev_artide_cate set is_delete=1 where id=?'
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除文章分类失败')
    res.cc('删除文章分类成功!', 0)
  })
}
// 根据 ID 查询
export const getArticleById = (req, res) => {
  const sql = `select * from ev_artide_cate where id=?`
  db.query(sql, req.params.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // SQL 语句执行成功，但是没有查询到任何数据
    if (results.length !== 1) return res.cc('获取文章分类数据失败!')
    // 把数据响应给客户端 
    res.send({
      status: 0,
      message: '获取文章分类数据成功!',
      data: results[0],
    })
  })
}

// 根据 ID 更新分类
export const updateCateById = (req, res) => {
  // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
  const sql = `select * from ev_artide_cate where Id<>? and (name=? or alias=?)`
  db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 判断 分类名称 和 分类别名 是否被占用
    if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试!')
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试!')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试!')
    // 更新设置
    const sql = `update ev_artide_cate set ? where Id=?`
    db.query(sql, [req.body, req.body.Id], (err, results) => { // 执行 SQL 语句失败
      if (err) return res.cc(err)
      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('更新文章分类失败!')
      // 更新文章分类成功
      res.cc('更新文章分类成功!', 0)
    })
  })
}
