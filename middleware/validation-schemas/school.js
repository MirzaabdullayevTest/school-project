const Joi = require('joi')

const schoolCreateSchema = Joi.object({
    name: Joi.string().required(),
    userId: Joi.string().required(),
})

module.exports = {
    schoolCreateSchema,
}