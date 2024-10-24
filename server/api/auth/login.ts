import { defineEventHandler,readBody  } from 'h3'
import {UserSchema} from "~/models/user.schema";

export default defineEventHandler(async (event) => {

    if(event._method !== 'POST'){
        return new Response(null, {
            status: 302,
            headers: {
                Location: '/',
            },
        })
    }
    const body = await readBody(event)
    if (!body) {
        return { error: 'Request body is missing' }
    }
    const { email, password } = body

    console.log(body)

    if (!email || !password) {
        return { error: 'Email and password are required' }
    }

    try {
        const user = await UserSchema.findOne({ email }).exec()

        if (!user) {
            return { error: 'User not found' }
        }

        if (user.password !== password) {
            return { error: 'Invalid password' }
        }

        // 登录成功，可以在这里生成令牌或其他操作
        return { success: true, message: 'Logged in successfully' }
    } catch (error) {
        // 简单错误处理，可以根据需要进行更详细的错误分类
        return { error: 'An error occurred during login' }
    }
})