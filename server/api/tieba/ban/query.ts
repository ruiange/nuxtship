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
    try {
        const {data} = await axios({
            method: 'post',
            url: 'https://tiebaapi.ruiange.work/ban'
        });
        return data;
    } catch (e) {
        return {
            code: 500,
            message: e.message
        }
    }
});