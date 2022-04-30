const express = require('express');
const port = process.env.PORT || 3400;
const hbs = require('hbs');
const path = require('path');
const app = express();
app.set('view engine', 'hbs');

const partialsPath = path.join(__dirname, '/views/partials');
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
	res.render('index', {
		pageBody: 'Hello node',
	});
});
app.get('/reservation', (req, res) => {
	res.render('reservation');
});

// '/' - główny adres strony
// w momencie gdy użytkownik zrobi request typu get, wywołaj funkcję.

app.use('/images', express.static(__dirname + '/images'));
app.use('/js', express.static(path.join(__dirname, './js'))); // dodanie nowych katalogów do projektu
app.use('/data', express.static(path.join(__dirname, './data'))); // dodanie nowych katalogów do projektu
app.use('/css', express.static(path.join(__dirname, './css')));

app.listen(port, () => {
	console.log(`Apka działa na porcie ${port}`);
});
