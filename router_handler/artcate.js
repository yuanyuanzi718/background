import db from '../db/index.js'

// 获取文章分类列表成功
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

// 新增文章分类列表
export const addArticleCates = (req, res) => {
  const sql = `select * from ev_artide_cate where name=? or alias=?`
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    if (err) return res.send(err)
    if (results.length === 2) return res.send('分类名称与别名被占用，请更换后重试!')
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.send('分类名称与分类别名被占用')
    if (results.length === 1 && results[0].name === req.body.name) return res.send('分类名称被占用，请更换后重试!')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.send('分类别名被占用，请更换后重试!')
    const sql = `insert into ev_artide_cate set ?`
    db.query(sql, req.body, (err, results) => {
      if (err) return res.send(err)
      if (results.affectedRows !== 1) return res.send('新增文章分类失败!')
      res.send({
        status: 0,
        message: '新增文章分类列表成功'
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
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取文章分类数据失败!')
    res.send({
      status: 0,
      message: '获取文章分类数据成功!',
      data: results[0],
    })
  })
}

// 根据 ID 更新分类
export const updateCateById = (req, res) => {
  const sql = `select * from ev_artide_cate where Id<>? and (name=? or alias=?)`
  db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err)
    if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试!')
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试!')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试!')
    const sql = `update ev_artide_cate set ? where Id=?`
    db.query(sql, [req.body, req.body.Id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新文章分类失败!')
      res.cc('更新文章分类成功!', 0)
    })
  })
}
