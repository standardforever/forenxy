const express = require('express');
const cors = require('cors');
const user = require('./routes/user');
const { user_schema } = require('./models/user');
const { db } = require('./utils/database')
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


// Create all tables
db.createTable(user_schema);

// (async () => {
// 	const hash = await hashPassword('1')
// 	// $2b$10$5ysgXZUJi7MkJWhEhFcZTObGe18G1G.0rnXkewEtXq6ebVx1qpjYW
  
// 	// TODO: store hash in a database
// 	console.log(hash)
//   })()

// (async () => {
// 	// Hash fetched from DB
// 	const hash = `$2b$10$r4eTplJzMheUvntQDFj18OCjyYx6wpiW.B5TlhytYcFlFaDq/oLZ.`
  
// 	// Check if the password is correct
// 	const isValidPass = await comparePassword('1', hash)
  
// 	// Print validation status
// 	console.log(`Password is ${!isValidPass ? 'not' : ''} valid!`)
// 	// => Password is valid!
//   })()

app.listen(5001, () => console.log('Forenxy API is listening on PORT 5000'));
