import { defineMongooseModel } from '#nuxt/mongoose'

// import { hash } from 'bcrypt'

export const UserSchema = defineMongooseModel({
    name: 'User',
    schema: {
        // 邮件
        email: {
            type: 'string',
            unique: true,
        },
        // 密码
        password: {
            type: 'string',
        },
        // 微信小程序 openid
        openid: {
            type: 'string',
        },
        // 微信小程序 unionid
        unionid:{
            type: 'string'
        },
        // 昵称
        nickname: {
            type: 'string',
        },
        // 头像
        avatar: {
            type: 'string',
        },
        // 积分
        gold: {
            type: 'string',
        },
        // 角色
        role: {
            type: 'string',
        },
    },
    hooks(schema) {

    },
})





