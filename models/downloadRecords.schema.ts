import { defineMongooseModel } from '#nuxt/mongoose'

export const DownloadRecordSchema = defineMongooseModel({
    name: 'DownloadRecord',
    schema: {
        // 用户 ID，引用自 Users 集合
        userId: {
            type: String, // 如果你使用的是 ObjectId，可以改为 type: mongoose.Schema.Types.ObjectId
            required: true,
        },
        // 用户提供的视频链接
        videoUrl: {
            type: String,
            required: true,
        },
        // 解析后的视频下载链接
        parsedVideoUrl: {
            type: String,
            required: true,
        },
        // 下载时间
        downloadedAt: {
            type: Date,
            default: () => new Date(),
        },
        // 消耗的金币（固定为 10）
        coinsSpent: {
            type: Number,
            default: 10, // 默认值为 10
        },
    },
});
