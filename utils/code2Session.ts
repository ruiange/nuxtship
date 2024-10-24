import axios from "axios";

/**
 * 小程序登录
 * code2Session
 * @param code 小程序登录凭证
 * @doc https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-login/code2Session.html
 * @return openid 用户唯一标识
 */
const code2Session = async (code: string): Promise<string> => {

    const {data} =await axios({
        method: 'get',
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        params: {
            appid: process.env.APPID,
            secret: process.env.APPSECRET,
            js_code: code,
            grant_type: 'authorization_code'
        }
    })

    return data.openid
}


export default code2Session