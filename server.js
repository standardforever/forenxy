const express = require('express');
const cors = require('cors');
const user = require('./routes/user');
const mySqlClient = require('./models/user');

require("dotenv").config();


const app = express();


/* Parse the incoming request to JSON object*/
app.use(express.json());

/* Handles CORS errors */
app.use(cors())

/* Users endpoint */
app.use('/api/v1/user', user)



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


mySqlClient;
app.listen(5000, () => console.log('Forenxy API is listening on PORT 5000'));
