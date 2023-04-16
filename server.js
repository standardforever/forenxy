const express = require('express');
const cors = require('cors');


const app = express();

/* Parse the incoming request to JSON object*/
app.use(express.json());

/* Handles CORS errors */
app.use(cors())

app.get('/', (req, res) => {
	res.send('Welcome to forenxy API');
});

app.get('/auth/google', (req, res) => {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: 'https://www.googleapis.com/auth/gmail.send'
	});
	res.redirect(authUrl);
});

app.get('/auth/google/callback', async (req, res) => {
	const { code } = req.query;
	const { token } = await oAuth2Client.getToken(code);
	console.log(token)

});

app.listen(5000, () => console.log('Forenxy API is listening on PORT 5000'));
