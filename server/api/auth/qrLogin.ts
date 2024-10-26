import { defineEventHandler } from 'h3';
import getUnlimitedQRCode from "~/utils/getUnlimitedQRCode";

/**
 * 创建一个事件处理程序，用于生成和返回无限二维码图像
 *
 * 此函数通过定义一个事件处理程序来响应HTTP请求它尝试生成一个二维码图像，
 * 如果成功，它将图像设置为响应的Content-Type头，并将图像数据作为响应返回如果生成二维码失败，
 * 它将返回一个包含错误信息的字符串
 *
 * @param event - 包含请求和响应对象的事件数据
 * @returns 返回生成的二维码图像或错误信息
 */
export default defineEventHandler(async (event) => {
    try {
        // 生成无限二维码图像

        const scene = '1234';

        const buffer = await getUnlimitedQRCode(scene,'pages/auth/auth');

        // 设置响应头，指定内容类型为PNG图像
        event.node.res.setHeader('Content-Type', 'image/png');

        // 结束响应，并将二维码图像数据发送给客户端
        event.node.res.end(buffer);
    } catch (error) {
        // 如果生成二维码时发生错误，返回错误信息
        return `二维码生成失败${error.message}`;
    }
})
