import { defineEventHandler,readBody  } from 'h3'
import {UserSchema} from "~/models/user.schema";
import {password} from "iron-webcrypto";
import code2Session from "~/utils/code2Session";

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
    const { code } = body as any



    if (!code) {
        return { error: 'Code is missing' }
    }


    const openid = await code2Session(code)


    console.warn('openid:' + openid)
    return {
        openid
    }
})