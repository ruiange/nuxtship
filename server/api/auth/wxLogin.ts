import {defineEventHandler, readBody} from 'h3'
import {UserSchema} from "~/models/user.schema";
import code2Session from "~/utils/code2Session";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    if (event._method !== 'POST') {
        return new Response(null, {
            status: 302,
            headers: {
                Location: '/',
            },
        })
    }

    const body = await readBody(event)
    if (!body) {
        return {error: 'Request body is missing'}
    }
    const {code} = body as any


    if (!code) {
        return {error: 'Code is missing'}
    }


    const openid = await code2Session(code)


    if (!openid) {
        return {error: 'Code is invalid'}
    }

    const userinfo = await UserSchema.findOne({openid: openid})

    console.log(userinfo)


    const secretKey = process.env.TOKEN_KEY as string
    let token = null
    let userData = {}
    // 如果用户不存在 使用openid 注册用户
    if (!userinfo) {
        userData = await UserSchema.create({openid: openid})
    }else{
        userData = userinfo
    }

    token = jwt.sign({id: userData._id, openid: userData.openid}, secretKey);
    return {
        token, openid, userInfo: {
            nickname: userData.nickname || '剑客无名',
            avatarUrl: userData.avatar || null,
        }
    }
})