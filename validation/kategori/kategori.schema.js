const Joi = require ('joi')

const schema = {
    create: Joi.object({
        title: Joi.string().max(100).required()
    })
}

module.exports =schema;