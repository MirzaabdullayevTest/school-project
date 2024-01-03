const Joi = require('joi')

const classCreateSchema = Joi.object({
    schoolId: Joi.string().required(),
    name: Joi.string().required(),
    curator: Joi.string().required(),
})

module.exports = {
    classCreateSchema,
}