const express = require("express");
const axios = require("axios");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");


require("dotenv").config();

const app = express();


const generateConfig = (url, accessToken) => {
    return {
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${accessToken} `,
        "Content-type": "application/json",
      },
    };
  };

  const auth = {
    type: "OAuth2",
    user: "kusimoakin123@gmail.com",
    clientId: '735595183577-luok8jb720hbdfkt8knscgo9hm9svhnm.apps.googleusercontent.com',
    clientSecret: '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',
    refreshToken: '1//03RvoeTcu0vHECgYIARAAGAMSNwF-L9Ir4iu31v86W3wAeNbhNg6YlFWCGmDGaJYk3QfTbwClC4qu3K3Ym9AspC2Uy3ALYvLo_hU',
  };
  
  const mailoptions = {
    from: "kusimoakin123@gmail.com",
    to: "standard.forever123@gmail.com",
    subject: "Gmail API NodeJS",
  };




app.listen(5000, () => {
  console.log("listening on port " + "5000");
});

app.get("/", async (req, res) => {
  // const result=await sendMail();
  res.send("Welcome to Gmail API with NodeJS");
});


const oAuth2Client = new google.auth.OAuth2(
    '735595183577-luok8jb720hbdfkt8knscgo9hm9svhnm.apps.googleusercontent.com',
    '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',
    process.env.REDIRECT_URI
  );
  
oAuth2Client.setCredentials({ refresh_token: '1//03RvoeTcu0vHECgYIARAAGAMSNwF-L9Ir4iu31v86W3wAeNbhNg6YlFWCGmDGaJYk3QfTbwClC4qu3K3Ym9AspC2Uy3ALYvLo_hU' });

async function sendMail(req, res) {
    try {
    //   const accessToken = await oAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          ...auth,
          accessToken: 'ya29.a0Ael9sCN_Oar2gOEWsz3Z1491RR3Pnza7sA0ymGsoxrIAmglOw41ijgpfFlL6TeOWxNQ_VEp9milEVEPGY4eSLL4-n0XOxfp9DfqQiJwHKdif93pTTIYqALH5ZX0snITRoxm0lQdHrLU_2EOJ2q7LIGRAFlBWaCgYKAecSARISFQF4udJh5ml3WiLD14TmpScnqZoDtw0163',
        },
      });
  
      const mailOptions = {
        ...mailoptions,
        text: "The Gmail API with NodeJS works",
      };
  
      const result = await transport.sendMail(mailOptions);
      res.send(result);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

app.get('/api/mail/send', sendMail);