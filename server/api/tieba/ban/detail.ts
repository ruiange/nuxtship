import {defineEventHandler, readBody} from 'h3'
import axios from "axios";
import {id} from "postcss-selector-parser";

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

    if (!body.id) {
        return {
            code: 400,
            message: 'id is required'
        }
    }
    const id = body.id;

    try {
        const {data} = await axios({
            method: 'post',
            url: 'https://tiebaapi.ruiange.work/ban',
            data: {
                id: id
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