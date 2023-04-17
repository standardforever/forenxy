const asyncHandler = require("express-async-handler")
const { sendGmail } = require('../utils/email')


exports.email = asyncHandler(async (req, res) => {
    await sendGmail('adewoyesaheed001@gmail.com', 'Testing email', '<h1> THanks </h>');
    res.send("ok")
})