import { defineMongooseModel } from '#nuxt/mongoose'

// import { hash } from 'bcrypt'

export const UserSchema = defineMongooseModel({
    name: 'User',
    schema: {
        // 邮件
        email: {
            type: 'String',
            unique: true,
        },
        // 密码
        password: {
            type: 'String',
        },
        // 微信小程序 openid
        openid: {
            type: 'String',
            unique: true,
        },
        // 微信小程序 unionid
        unionid:{
            type: 'String'
        },
        // 昵称
        nickname: {
            type: 'String',
        },
        // 头像
        avatar: {
            type: 'String',
        },
        // 积分
        gold: {
            type: 'Number',
            default: 0
        },
        // 角色
        role: {
            type: 'String',
        },
        createdAt:{
            type:'String'
        }
    },
    hooks(schema) {

    },
})





