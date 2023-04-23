const asyncHandler = require("express-async-handler");
const uuid = require("uuid");
const { sendGmail } = require('../utils/email');
const { emailVerfication, ph } = require('../utils/validation');
const { confirmVerification, sendVerification } = require('../utils/phone_verification');
const { db } = require('../utils/database');
const { hashPassword, comparePassword } = require('../utils/hashPassword')

const bcrypt = require('bcrypt')



exports.email = asyncHandler(async (req, res) => {
    await sendGmail('standard.forever123@gmail.com', 'Testing email', '<h1> THanks </h>');
    res.send("ok")
});


/**
 * emailRegistration - Controller to register email
 * @email : email from req.body.email
 * @password : password from req.body.password
 */

exports.emailRegistration = asyncHandler(async (req, res) => {
    try {
        // Verify the input field
        const { error } = emailVerfication(req.body)
        if (error) return res.status(400).json({error: error.details[0].message});

        // Check if the user exit in database
        const user = await db.getOne('users', 'email', req.body.email)
        if (user)
            return res.status(400).json({error: 'User with given email already exist!'});
        
        // Payload to create a newuser
        const id = uuid.v4();
        const token = uuid.v4()
        req
        const hash_password = await hashPassword(req.body.password)

        const newUser = {
            email: req.body.email,
            password: hash_password,
            id: id,
            token: token
        }

        // Create a new user
        await db.create('users', newUser)

        // send verification email
        const message = `${process.env.BASE_URL}/user/verify/${id}/${token}`;
        await sendGmail(req.body.email, 'Testing email', `<h1> THanks </h> <p> <a href= ${message}> Click the link to verify</a> </p>`);

        res.status(201).json({message: "An Email sent to your account please verify"});
    } catch (error) {
        console.error(error)
        res.status(400).json({message: "An error occured"})
    }
});


/**
 * emailRegistration - Controller to register email
 * @id : id from req.params.id to verify user
 * @token : token from req.params.token to verify users token
 */

exports.emailVerify = asyncHandler(async (req, res) => {
    try {
            // check if the user id is valid
            const user =  await db.getOne('users', 'id', req.params.id);
            if (!user) return res.status(400).send("Invalid link");
            127.
            // Check if email is already verified
            if (user.emailIsActivated == true) return res.status(400).send("User is already verified")

            // Check if the token is valid
            if (req.params.token != user.token) return res.status(400).send("Invalid link");

            // Update the Record and set 'emailIsActivated' to true
            const params = await db.updadte('users', req.params.id, {emailIsActivated: true})
            res.send("email verified sucessfully");
    } catch (error) {

      res.status(400).send("An error occured");
    }
  });


exports.sendVerificationCode = asyncHandler(async (req, res) => {
    try {
        // Verify the input field
        // const { error } = phoneVerification(req.body)
        // if (error) return res.status(400).json({error: error.details[0].message});

        // Check if the user exit in database
        const user = await db.getOne('users', 'email', req.body.email)
        if (!user)
            return res.status(400).json({error: 'User with this email doesnt exist '});

        // Check the users password
        if (await comparePassword(user.password, req.body.password)) return res.status(400).json({error: 'Invalid user name or password'});

        // Check if email is activated
        if (user.emailIsActivated == false) return res.status(400).json({error: "email is not activated"});

        // const params = await db.updadte('users', req.params.id, {emailIsActivated: true})
        await sendVerification(req.body.phone);
        res.status(201).json({success: "check for verification code"})
    } catch (error) {
        console.log(error);
        res.status(400).send("An error occured");
    }
});

exports.phoneVerification = asyncHandler(async (req, res) => {

})

exports.forgetPassword = asyncHandler(async (req, res) => {

})