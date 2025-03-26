   const Joi = require('joi');


const auth_modelSchema = Joi.object({
   email: Joi.string().email().lowercase().required(),
   password: Joi.string().min(6).required()
}) 

module.exports ={
    auth_modelSchema
}