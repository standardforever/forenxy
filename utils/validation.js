const joi = require("joi")

/**
 * 
 * emailVerification - verify emails input
 * @user : input to verify
 */
const emailVerfication = (user) => {
    const schema = joi.object({
        password: joi.string().min(3).max(233).required(),
        email: joi.string().email().required()
    });
    return schema.validate(user);
};

/**
 * 
 * phoneVerification - it verify phone number
 * @number : the number to verify 
 */
const phoneVerification = (number) => {
    const schema = joi.object({
        password: joi.string().min(3).max(233).required(),
        email: joi.string().email().required(),
        phone: joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
    })
    return schema.validate(number)
};

module.exports = {
    emailVerfication,
    phoneVerification,
};