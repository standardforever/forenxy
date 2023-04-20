require("dotenv").config();
const accountSid = process.env.TWILIO_SSID;
const authToken = process.env.TWILIO_TOKEN;
const phoneNumber = process.env.PHONE_NUMBER
const client = require('twilio')(accountSid, authToken);

client.verify.v2.services
                .create({friendlyName: 'My First Verify Service'})
                .then(service => console.log(service.sid));

