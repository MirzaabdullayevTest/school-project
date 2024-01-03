const Joi = require('joi')

const tableCreateSchema = Joi.object({
    classId: Joi.string().required(),
    lessonNumber: Joi.number().required(),
    subject: Joi.string().required(),
    teacher: Joi.string().required(),
    room: Joi.string().required(),
    dayId: Joi.string().required(),
})

module.exports = {
    tableCreateSchema,
}