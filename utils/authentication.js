const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

async function getAccessToken() {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: 'https://www.googleapis.com/auth/gmail.send'
	});
	console.log('Authorize this app by visiting this URL: ', authUrl);
	const code = 'authorization code from rediirect uri'; // replace with authorization code
	const { tokens } = await oAuth2Client.getToken(code);
	console.log('Access token: ', tokens.access_token);
}

getAccessToken();
