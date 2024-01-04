const Joi = require('joi')

const tableCreateSchema = Joi.object({
    classId: Joi.string().length(24).required(),
    lessonNumber: Joi.number().required(),
    subject: Joi.string().required(),
    teacher: Joi.string().required(),
    room: Joi.string().required(),
    dayId: Joi.string().length(24).required(),
})

const tableUpdateSchema = Joi.object({
    tableId: Joi.string().length(24).required(),
    classId: Joi.string().length(24),
    lessonNumber: Joi.number(),
    subject: Joi.string(),
    teacher: Joi.string(),
    room: Joi.string(),
    dayId: Joi.string().length(24),
})

module.exports = {
    tableCreateSchema,
    tableUpdateSchema
}