const Joi = require('joi')

const scheduleCreateSchema = Joi.object({
    schoolId: Joi.string().required(),
    startTime: Joi.string().required(),
    duration: Joi.string().required(),
    breakTime: Joi.string().required(),
    bigBreakTime: Joi.string().required(),
    bigBreakAfterLesson: Joi.string().required(),
    endTime: Joi.string().required(),
})

module.exports = {
    scheduleCreateSchema,
}