const express = require('express');
const cors = require('cors');
const user = require('./routes/user')
const { email } = require('./controllers/user');
const sendGmail = require('./utils/email');

require("dotenv").config();


const app = express();


/* Parse the incoming request to JSON object*/
app.use(express.json());

/* Handles CORS errors */
app.use(cors())

// app.use('/api/v1/user', user)



app.get('/email-sender',  async (req, res) => {
	await sendGmail('standard.forever123@gmail.com', 'Testing email', '<h1> THanks </h>');
	res.send("ok")
});

app.get('/', (req, res) => {
	res.send('Welcome to forenxy API');
});



app.get('/auth/google', (req, res) => {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES
	});
	res.redirect(authUrl);
});

app.get('/auth/google/callback', async (req, res) => {
	const { code } = req.query;

	const { tokens } = await oAuth2Client.getToken(code);
	console.log(tokens)
	const expiryDate = new Date(tokens.expiry_date);
	console.log('Access token expires at:', expiryDate.toLocaleString());
	res.send('Authorization successful!');
});



// app.get('/send', async (req, res) => {
// 	try {
// 	  const accessToken = await oAuth2Client.getAccessToken();
// 	  const transporter = nodemailer.createTransport({
// 		service: 'gmail',
// 		auth: {
// 		  type: 'OAuth2',
// 		  user: EMAIL,
// 		  clientId: CLIENT_ID,
// 		  clientSecret: CLIENT_SECRET,
// 		  refreshToken: REFRESH_TOKEN,
// 		  accessToken: accessToken
// 		}
// 	  });
  
// 	  const mailOptions = {
// 		from: EMAIL,
// 		to: 'standard.forever123@gmail.com',
// 		subject: 'Test email',
// 		text: 'This is a test email from Node.js using Nodemailer with Google OAuth2 authentication.'
// 	  };
  
// 	  const result = await transporter.sendMail(mailOptions);
// 	  res.send(result);
// 	} catch (error) {
// 	  console.log(error);
// 	  res.send(error);
// 	}
//   });

  


app.listen(5000, () => console.log('Forenxy API is listening on PORT 5000'));
