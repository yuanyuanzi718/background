import express from 'express'
import { getArticleCates, addArticleCates, deleteCateById, getArticleById, updateCateById } from '../router_handler/artcate.js'
import { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } from '../schema/artcate.js'
import { expressJoi } from '../schema/expressJoi.js'

const router = express.Router()
// 获取
router.get('/cates', getArticleCates)
// 新增
router.post('/addcates', expressJoi(add_cate_schema), addArticleCates)
// 删除
router.get('/deletecate/:id', expressJoi(delete_cate_schema), deleteCateById)
// 根据 Id 获取
router.get('/cates/:id', expressJoi(get_cate_schema), getArticleById)
// 根据 Id 更新分类
router.post('/updatecate', expressJoi(update_cate_schema), updateCateById)

export default router