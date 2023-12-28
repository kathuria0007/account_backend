import joi from '@hapi/joi';

const clientProfileSchema = joi.object({
    firstname: joi.string().trim().required(),
    lastname: joi.string().trim(),
    email: joi.string().trim().email().required(),
    fathername:joi.string().required(),
    age: joi.string(),
    city: joi.string().required(),
    pincode: joi.string().required(),
    password:joi.string().required()
})
const userProfileSchema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().optional(),
})
export const validateClientData = (client: any) => {
    return clientProfileSchema.validate(client)
}
export const validateClient = (client: any) => {
    return userProfileSchema.validate(client)
}
