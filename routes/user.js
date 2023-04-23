const express = require("express");
const { email, emailRegistration, emailVerify, 
sendVerificationCode } = require('../controllers/user');

const router = express.Router();


router.get('/email-sender', email);
router.post('/register-email', emailRegistration);
router.get('/verify/:id/:token', emailVerify);


router.post('/register-phone', sendVerificationCode);
module.exports = router