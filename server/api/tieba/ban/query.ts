import { defineEventHandler,readBody } from 'h3'
import axios from "axios";

export default defineEventHandler(async (event) => {
    if(event._method !== 'POST'){
        return new Response(null, {
            status: 302,
            headers: {
                Location: '/',
            },
        })
    }
    const body = await readBody(event);
    const { id } = body;
    const requestData = id ? { id } : {};
    const {data} = await axios({
        method: 'post',
        url: 'https://tiebaapi.ruiange.work/ban', // 去掉多余的单引号
        data: requestData // 使用构建的请求数据
    });
    return data;
});