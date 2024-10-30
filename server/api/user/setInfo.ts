import {defineEventHandler, readBody} from 'h3';
import {UserSchema} from "~/models/user.schema";
import jwt from "jsonwebtoken";
import {id} from "postcss-selector-parser";
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const headers = event.node.req.headers

    // 验证token
    if (!headers.authorization) {
        return {
            code: 401,
            message: '未登录'
        }
    }
    const token = headers.authorization
    const secretKey = process.env.TOKEN_KEY as string
    const decoded = jwt.verify(token, secretKey) as { id: string; openid: string };
    if (!decoded) {
        return {
            code: 401,
            message: 'token无效'
        }
    }
    console.log(decoded)
    const {nickname,avatar} = body

    const {id} = decoded

    // 更新用户资料
    const result = await UserSchema.updateOne({_id: id}, {nickname,avatar}, {new: true})
    console.log(result)
    return {
        code: 200,
        data: {
            result,
            decoded
        },
        message: 'success'
    }
})
