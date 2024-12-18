const Joi = require("@hapi/joi");

//regsister validation 
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        username: Joi.string().min(3).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    })
    return schema.validate(data);
} 

//loginValidation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    })
    return schema.validate(data);
} 
//postValidation
const postValidation = (data) => {
    const schema = Joi.object({
        postedBy: Joi.string().required(),
        media: Joi.string().required(),
        caption: Joi.string().required()
    })
    
    return schema.validate(data);
} 
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;