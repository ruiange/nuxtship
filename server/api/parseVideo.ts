import {defineEventHandler, readBody} from 'h3'
import axios from "axios";

/**
 * 解析视频链接
 */
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    if (!body.url) {
        return {
            code: 400,
            msg: '复制🔗不能为空'
        }
    }
    try{
        const {data} = await axios({
            method: 'get',
            url: 'http://101.126.92.189:8090/api/hybrid/video_data',
            params: {
                url: body.url,
                minimal: true
            }
        })
        if('router' in data) {
            delete data.router
        }
        return data
    }catch (e:any){
        return {
            code: 400,
            msg: '解析失败'+ e.message
        }
    }
})