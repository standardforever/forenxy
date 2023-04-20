require("dotenv").config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const PHONE_NUMBER = process.env.PHONE_NUMBER
const VERIFICATION_SID = process.env.VERIFICATION_SID
const client = require('twilio')(accountSid, authToken);


/**
 * sendVrifcation - it send verification code to user
 * @to_number: phonNumber to send the message to
 */

 const sendVerification = async (to_number) => {
    client.verify.v2.services(VERIFICATION_SID)
                .verifications
                .create({to: to_number, channel: 'sms'})
                .then(verification => console.log(verification.status));
}


/**
 * confirmVrifcation - it verifies the code
 * @to_number : phonNumber to send the message to
 * @code : The code send by sendVerification
 */

 const confirmVerification = async (code, to_number) => {
	client.verify.v2.services(VERIFICATION_SID)
      .verificationChecks
      .create({to: to_number, code: code})
      .then(verification_check => console.log(verification_check.status));
}
 

/**
 * createService - to create a VERIFICATION_SID which is use for token verification
 */
const createService = async () => {
    client.verify.v2.services
                .create({friendlyName: 'My First Verify Service'})
                .then(service => console.log(service.sid));
 };
//  createService()