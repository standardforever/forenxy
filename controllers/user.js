const asyncHandler = require("express-async-handler")
const emailSender = require('../utils/email')


exports.email = asyncHandler(async (req, res) => {
    await emailSender('standard.forever123@gmail.com', 'Testing email', '<h1> THanks </h>');
    res.send("ok")
})