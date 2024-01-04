const Joi = require('joi')

const scheduleCreateSchema = Joi.object({
    schoolId: Joi.string().length(24).required(),
    startTime: Joi.string().required(),
    duration: Joi.string().required(),
    breakTime: Joi.string().required(),
    bigBreakTime: Joi.string().required(),
    bigBreakAfterLesson: Joi.string().required(),
    endTime: Joi.string().required(),
})

const scheduleUpdateSchema = Joi.object({
    schoolId: Joi.string().length(24).required(),
    startTime: Joi.string(),
    duration: Joi.string(),
    breakTime: Joi.string(),
    bigBreakTime: Joi.string(),
    bigBreakAfterLesson: Joi.string(),
    endTime: Joi.string(),
})

const scheduleDeleteSchema = Joi.object({
    scheduleId: Joi.string().length(24).required(),
})

module.exports = {
    scheduleCreateSchema,
    scheduleUpdateSchema,
    scheduleDeleteSchema
}