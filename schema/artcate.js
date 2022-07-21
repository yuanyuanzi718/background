// 导入定义验证规则的包
import Joi from '@hapi/Joi'

// 定义 分类名称 和 分类别名 的校验规则
const name = Joi.string().required()
const alias = Joi.string().alphanum().required()
const id = Joi.number().integer().min(1).required()

// 校验规则对象 - 添加分类 
export const add_cate_schema = {
  body: { name, alias }
}

// 校验规则对象 - 添加分类 
export const delete_cate_schema = {
  params: {
    id,
  }
}

// 根据 Id 获取
export const get_cate_schema = {
  params: {
    id,
  }
}

// 根据 Id 更新
export const update_cate_schema = {
  body: {
    Id: id,
    name,
    alias,
  }
}

