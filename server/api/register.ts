import { defineEventHandler,readBody } from 'h3'
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
    const { email, password } = body

    if (!email || !password) {
        return { error: 'Email and password are required' }
    }

    try {
        // 检查用户是否已存在
        const existingUser = await UserSchema.findOne({ email }).exec()
        if (existingUser) {
            return { error: 'User already exists' }
        }

        // 创建新用户
        const user = new UserSchema({ email, password })
        await user.save()

        // 返回成功响应
        return { success: true, message: 'User registered successfully' }
    } catch (error) {
        // 错误处理
        return { error: 'An error occurred during registration' }
    }
})