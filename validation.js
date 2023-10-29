const Joi = require("joi");

const userSchema = Joi.object({
    name:Joi.string().default("null"),
    email:Joi.string().email().required(),
    password:Joi.string(),
    updated_at:Joi.string().default("")  
});

module.exports = userSchema;