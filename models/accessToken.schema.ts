import { defineMongooseModel } from '#nuxt/mongoose'

export const AccessTokenSchema = defineMongooseModel({
    name: 'AccessToken',
    schema: {
        access_token: {
            type: String,
            required: true,
        },
        expires_in: {
            type: Number,
            required: true,
        },
        expirationTime: {
            type: Number,
            required: true,
        },
    },
});
