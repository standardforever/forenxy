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


app.listen(5000, () => console.log('Forenxy API is listening on PORT 5000'));
