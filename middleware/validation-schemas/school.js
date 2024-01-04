const Joi = require('joi')

const schoolCreateSchema = Joi.object({
    name: Joi.string().required(),
    userId: Joi.string().length(24).required(),
})

const schoolUpdateSchema = Joi.object({
    name: Joi.string(),
    userId: Joi.string().length(24),
    schoolId: Joi.string().length(24).required(),
})

const schoolDeleteSchema = Joi.object({
    schoolId: Joi.string().length(24).required(),
})

module.exports = {
    schoolCreateSchema,
    schoolUpdateSchema,
    schoolDeleteSchema
}