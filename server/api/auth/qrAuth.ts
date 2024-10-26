import {defineEventHandler, readBody} from 'h3';


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {loginId} = body
    if (!loginId) {
        return {
            error: 'loginId is required'
        }
    }

    return {
        code: 200,
        data: loginId,
        message: 'success'
    }
})
