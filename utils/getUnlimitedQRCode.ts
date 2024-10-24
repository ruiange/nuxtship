import getAccessToken from "./getAccessToken";
import axios from "axios";

/**
 * 获取小程序码
 * @param scene  场景值
 * @param page  页面路径
 * @return base64
 * @doc https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/qrcode-link/qrcode/createUnlimitedQRCode.html
 */
const getUnlimitedQRCode = async (scene: string, page: string = 'pages/index/index'): Promise<string> => {
    const access_token = await getAccessToken()
    console.log('-------------------')
    console.log(access_token)
    const {data} = await axios(
        {
            method: 'post',
            url: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${access_token}`,
            data: {
                scene: scene,
                page,
                check_path: true,
                width: 430,
                env_version: 'develop'
            }
        }
    )
    console.log('data', data)
    return data
};
export default getUnlimitedQRCode