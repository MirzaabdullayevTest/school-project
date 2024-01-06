const Joi = require('joi')

const adminCreateSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    isHeadAdmin: Joi.boolean().required(),
    password: Joi.string().min(6).required()
})

const adminLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

const adminUpdateSchema = Joi.object({
    password: Joi.string().min(6),
    name: Joi.string(),
    email: Joi.string().email().required(),
    oldPassword: Joi.string().min(6)
})

const userCreateSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

const clientUserCreateSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    schoolId: Joi.string().length(24).required(),
    password: Joi.string().min(6).required()
})

const clientUserUpdateSchema = Joi.object({
    password: Joi.string().min(6),
    name: Joi.string(),
    email: Joi.string().email().required(),
    schoolId: Joi.string().length(24),
    oldPassword: Joi.string().min(6)
})

module.exports = {
    adminCreateSchema,
    adminLoginSchema,
    adminUpdateSchema,
    userCreateSchema,
    clientUserCreateSchema,
    clientUserUpdateSchema
}