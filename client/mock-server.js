const express = require('express');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/build', (req, res) => {
	console.log('build body:', req.body);
	res.sendStatus(200);
});
app.get('/', (req, res) => {
	res.send('hello world');
});
app.post('/engine', (req, res) => {
	console.log('engine:', req);
	res.sendStatus(200);
});

app.listen(5000, () => console.log(`Started server at http://localhost:5000!`));
