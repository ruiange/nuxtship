import {defineEventHandler, readBody} from 'h3'
import getUnlimitedQRCode from "~/utils/getUnlimitedQRCode";

export default defineEventHandler(async (event) => {

    console.log('生成二维码')


    const data = await getUnlimitedQRCode('2323')
    console.log(data)
    return data
})