const Joi = require('joi')

const classCreateSchema = Joi.object({
    schoolId: Joi.string().length(24).required(),
    name: Joi.string().required(),
    curator: Joi.string().required(),
})

const classUpdateSchema = Joi.object({
    classId: Joi.string().length(24).required(),
    name: Joi.string(),
    curator: Joi.string(),
})

const classDeleteSchema = Joi.object({
    classId: Joi.string().length(24).required(),
})

module.exports = {
    classCreateSchema,
    classUpdateSchema,
    classDeleteSchema
}