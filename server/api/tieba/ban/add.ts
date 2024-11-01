import {defineEventHandler, readBody} from 'h3'
import axios from "axios";

export default defineEventHandler(async (event) => {
    if (event._method !== 'POST') {
        return new Response(null, {
            status: 302,
            headers: {
                Location: '/',
            },
        })
    }
    const body = await readBody(event);

    if (!body.tieba_uid) {
        return {
            code: 400,
            message: 'tieba_uid is required'
        }
    }
    const tieba_uid = body.tieba_uid;

    console.log(tieba_uid);

    try {
        const {data} = await axios({
            method: 'post',
            url: 'https://tiebaapi.ruiange.work/ban/add',
            data: {
                tieba_uid: tieba_uid
            }
        });
        return data;
    } catch (e) {
        return {
            code: 500,
            message: e.message
        }
    }
});