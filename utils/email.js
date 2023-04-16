const { google } = require('googleapis');
const nodemailer = require('nodemailer');


const CLIENT_ID = process.env.CLINET_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const EMAIL = process.env.EMAIL
const SCOPES = ['https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/userinfo.email', "https://mail.google.com/"];
const REFRESH_TOKEN = process.env.REFRESH_TOKEN


const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI
  );


  oAuth2Client.setCredentials({
	refresh_token: REFRESH_TOKEN
  });


exports.sendGmail = async (to, subject, body) => {
    const accessToken = await oAuth2Client.getAccessToken();
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                type: 'OAuth2',
                user: EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: EMAIL,
            to: to,
            subject: subject,
            html: html
        };

        const result = await transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(info);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

