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
    let accessTokenData
    accessTokenData = await AccessTokenSchema.findOne()
    if (accessTokenData && 'access_token' in accessTokenData && accessTokenData.expirationTime > new Date()) {
        console.log('使用缓存access_token：'+accessTokenData.access_token)
        return accessTokenData.access_token
    }
    console.log('刷新access_token')
    const appId = process.env.APPID
    const appSecret = process.env.APPSECRET
    const {data} = await axios({
        method: 'get',
        url: 'https://api.weixin.qq.com/cgi-bin/token',
        params: {
            grant_type: 'client_credential',
            appid: appId,
            secret: appSecret
        }
    })
    console.log('data', data)
    accessTokenData = {
        access_token: data.access_token,
        expires_in: data.expires_in,
        expirationTime: new Date().getTime() + data.expires_in * 1000
    }
    console.log('=============')
    await AccessTokenSchema.create(accessTokenData)
    return data.access_token
};

export default getAccessToken