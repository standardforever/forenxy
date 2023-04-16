const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);


const ACCESS_TOKEN_EXPIRY_THRESHOLD = 300; // in seconds, e.g. 5 minutes

let accessToken = null;
let accessTokenExpiryTime = null;
let refreshToken = 'ya29.a0Ael9sCMFOwqjiXrYcDgqzY0tJsZxJ8cdJtmy3tL-orQ-EyecT-25EN19Ljb0mOsL6wl-vd4N_kwcuvHjSj2iPj'

/**
 * refreshAccessToken - it refresh gmail token for sending emaili when it expires
 * @returns Gmail access token
 */
async function refreshAccessToken() {
	if (accessToken && accessTokenExpiryTime > Date.now() + ACCESS_TOKEN_EXPIRY_THRESHOLD * 1000) {
		return accessToken;
	}
	const { tokens } = await oAuth2Client.refreshAccessToken(refreshToken);
	accessToken = tokens.access_token;
	accessTokenExpiryTime = tokens.expiry_date;
	return accessToken;
}
