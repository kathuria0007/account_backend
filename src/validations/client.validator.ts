import joi from '@hapi/joi';

const clientProfileSchema = joi.object({
    firstname: joi.string().trim().required(),
    lastname: joi.string().trim().required(),
    email: joi.string().trim().email().required(),
    fathername:joi.string().required(),
    age: joi.string().required(),
    city: joi.string().required(),
    pincode: joi.string().required(),
})

export const validateClientData = (client: any) => {
    return clientProfileSchema.validate(client)
}

