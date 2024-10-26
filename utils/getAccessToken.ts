import axios from 'axios'
import {AccessTokenSchema} from '~/models/accessToken.schema'
interface access_token  {
    access_token: string,
    expires_in: number,
    expirationTime: number
}
/**
 * 获取接口调用凭据
 * @returns Promise<string> access_token 凭证
 * @doc https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/openApi/openApi.html
 */
const getAccessToken = async (): Promise<string> => {
    // 声明一个变量来存储访问令牌数据
    let accessTokenData

    // 尝试从数据库中查找访问令牌记录
    accessTokenData = await AccessTokenSchema.findOne()

    // 检查找到的访问令牌是否有效且未过期
    if (accessTokenData && 'access_token' in accessTokenData && accessTokenData.expirationTime > new Date()) {
        // 如果令牌有效且未过期，直接返回该令牌
        return accessTokenData.access_token
    }

    // 从环境变量中获取应用程序的ID和密钥
    const appId = process.env.APPID
    const appSecret = process.env.APPSECRET

    // 向微信API发送GET请求以获取新的访问令牌
    const {data} = await axios({
        method: 'get',
        url: 'https://api.weixin.qq.com/cgi-bin/token',
        params: {
            grant_type: 'client_credential',
            appid: appId,
            secret: appSecret
        }
    })

    // 准备新的访问令牌数据，包括令牌、有效期和过期时间
    accessTokenData = {
        access_token: data.access_token,
        expires_in: data.expires_in,
        expirationTime: new Date().getTime() + data.expires_in * 1000
    }

    // 将新的访问令牌数据保存到数据库中
    await AccessTokenSchema.create(accessTokenData)

    // 返回新获取的访问令牌
    return data.access_token
};

export default getAccessToken