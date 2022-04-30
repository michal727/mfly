{
	/* <div class='input-group'>
<span class='input-group-text'><i class='bi-pin-map'></i>
</span>
<input
    type='text'
    class='form-control'
    id='departure'
    placeholder='Miasto...'
/>

</div>
<ul id='results'></ul>
</div> */
}

const autocomplete = document.getElementById('departure');
const resultsHTML = document.getElementById('results');

// search cities.json and filter

const url = '/data/city.json';
let jsondata = '';

async function getJson(url) {
	let response = await fetch(url);
	let data = await response.json();
	return data;
}

async function main() {
	//Pobranie danych JSON do zmiennej
	jsondata = await getJson(url);
	console.log(jsondata);

	// MAP - Wypisanie wszytskich pozycji po kolei
	const lognames = function (x) {
		console.log(x);
	};
	const namesConsole = jsondata.map(lognames);

	// MAP - Zapisanie nazw miast do nowej tablicy
	let cityNames = jsondata.map((city) => {
		return city.name;
	});
	console.log(cityNames);

	// Funkcja Autocomplete

	function getResults(input) {
		const results = [];
		for (i = 0; i < cityNames.length; i++) {
			if (input === cityNames[i].slice(0, input.length)) {
				results.push(cityNames[i]);
			}
		}
		return results;
	}

	autocomplete.oninput = function () {
		let results = [];
		const userInput = this.value;
		resultsHTML.innerHTML = '';
		if (userInput.length > 0) {
			results = getResults(userInput);
			resultsHTML.style.display = 'block';
			for (i = 0; i < results.length; i++) {
				resultsHTML.innerHTML += '<li>' + results[i] + '</li>';
			}
		}
	};

	resultsHTML.onclick = function (event) {
		const setValue = event.target.innerText;
		autocomplete.value = setValue;
		this.innerHTML = '';
	};
}

main();

//dzialajacy FETCH

// console.log('lol');
// fetch('/data/city.json')
// 	.then((response) => response.json())
// 	.then((data) => {
// 		console.log(data);
// 	});

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
		'X-RapidAPI-Key': '2c532e2353msh68bdbec9bb93c15p140612jsn6d803d4745ed',
	},
};

fetch('https://booking-com.p.rapidapi.com/v1/hotels/nearby-cities?locale=en-gb&longitude=-18.5333&latitude=65.9667', options)
	.then((response) => response.json())
	.then((response) => console.log(response))
	.catch((err) => console.error(err));

//randomowe numery

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

getRandom = (min, max) => {
	return Math.floor(math.random() * max0min);
};

function getRandom() {
	return Math.random();
}

// pasazerowie z podzialem na wiek

<div class="col-6 col-md-1">
	<div class="dropdown  width100">
		<label for="passengers" class="form-label">
			{' '}
			Pasażerowie
		</label>
		<button class="btn passengers dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
			<i class="bi bi-person"></i>
			<span>1</span>
		</button>
		<ul class="dropdown-menu">
			<li class="dropdown-item">
				<div class="passengers-dropdown">
					<div class="passenger-type">
						<p>
							Dorośli <span>od 18 lat</span>{' '}
						</p>
					</div>
					<input type="number" min="0" class="passengers-numbers" id="adults-input" />
				</div>
			</li>
			<li class="dropdown-item">
				<div class="passengers-dropdown">
					<div class="passenger-type">
						<p>
							Młodzież <span>12-18 lat</span>{' '}
						</p>
					</div>
					<input type="number" min="0" class="passengers-numbers" id="adults-input" />
				</div>
			</li>
		</ul>
	</div>
</div>;

// .passengers-dropdown {
// 	width: 200px;
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: center;
// 	padding: 5px 0px;
// 	overflow: hidden;
// }

// .passengers-numbers {
// 	max-width: 50px;
// 	max-height: 30px;
// }

// .passenger-type p {
// 	margin: 0px;
// 	color: #1c2b39;
// 	font-size: 16px;
// 	font-weight: 700;
// 	line-height: 1;
// }

// .passenger-type p span {
// 	display: block;
// 	padding-top: 5px;
// 	font-size: 12px;
// 	color: #969dac;
// 	font-weight: 400;
// }

// .dropdown-toggle {
// 	width: 100%;
// }

// autocomplete

// HTML:
// {{!-- <input type='text' class='form-control' id='departure' placeholder='Skąd...'> --}}

// JS
// var inputDeparture = document.getElementById('departure');
// var inputArrival = document.getElementById('arrival');

// autocomplete({
// 	input: inputDeparture,
// 	minLength: 1,
// 	emptyMsg: 'Nie znaleziono',
// 	fetch: function (text, update) {
// 		text = text.toLowerCase();
// 		// you can also use AJAX requests instead of preloaded data
// 		var suggestions = countries.filter((n) => n.label.toLowerCase().startsWith(text));
// 		update(suggestions);
// 	},
// 	onSelect: function (item) {
// 		inputDeparture.value = item.label;
// 	},
// });

// autocomplete({
// 	input: inputArrival,
// 	minLength: 1,
// 	emptyMsg: 'Nie znaleziono',
// 	fetch: function (text, update) {
// 		text = text.toLowerCase();
// 		// you can also use AJAX requests instead of preloaded data
// 		var suggestions = countries.filter((n) => n.label.toLowerCase().startsWith(text));
// 		update(suggestions);
// 	},
// 	onSelect: function (item) {
// 		inputArrival.value = item.label;
// 	},
// });

// var countries = [
// 	{ label: 'Katowice (KTW)' },
// 	{ label: 'Londyn Heathrow (LHR) ' },
// 	{ label: 'Paryż Charles de Gaulle (CDG) ' },
// 	{ label: 'Frankfurt International Airport (FRA)' },
// 	{ label: 'Amsterdam Airport (AMS)' },
// 	{ label: 'Rzym Fiumicino (FCO)' },
// 	{ label: 'Madryt (MAD)' },
// 	{ label: 'Monachium (MUC)' },
// 	{ label: 'Barcelona Airport (BCN)' },
// 	{ label: 'Mediolan Malpensa (MXP)' },
// 	{ label: 'Wiedeń (VIE)' },
// 	{ label: 'Bruksela (BRU)' },
// 	{ label: 'Dublin Airport (DUB)' },
// 	{ label: 'Genewa (GVA)' },
// 	{ label: 'Kopenhaga (CPH)' },
// 	{ label: 'Zurych (ZRH)' },
// 	{ label: 'Sztokholm Arlanda (ARN)' },
// 	{ label: 'Ateny International (ATH)' },
// 	{ label: 'Dusseldorf (DUS)' },
// 	{ label: 'Budapeszt (BUD)' },
// 	{ label: 'Lizbona (LIS)' },
// 	{ label: 'Warszawa (WAW)' },
// 	{ label: 'Praga (PRG)' },
// 	{ label: 'Manchester International Airport (MAN)' },
// 	{ label: 'Oslo (OSL)' },
// 	{ label: 'Berlin Tegel (TXL)' },
// 	{ label: 'Nicea (NCE)' },
// 	{ label: 'Hamburg Airport (HAM)' },
// 	{ label: 'St Petersburg Pulkovo Airport (LED)' },
// 	{ label: 'Helsinki Airport (HEL)' },
// 	{ label: 'Londyn Gatwick (LGW)' },
// 	{ label: 'Wenecja (VCE)' },
// 	{ label: 'Edinburgh Airport (EDI)' },
// 	{ label: 'Lyon St-Exupery Airport (LYS)' },
// 	{ label: 'Malaga Airport (AGP)' },
// 	{ label: 'Stuttgart Airport (STR)' },
// 	{ label: 'Porto Airport (OPO)' },
// 	{ label: 'Marsylia (MRS)' },
// 	{ label: 'Bolonia (BLQ)' },
// 	{ label: 'Hannover Airport (HAJ)' },
// 	{ label: 'Bukareszt Otopeni (OTP)' },
// 	{ label: 'Zagrzeb (ZAG)' },
// 	{ label: 'Moskwa Szeremietiewo (SVO)' },
// 	{ label: 'Birmingham International Airport (BHX)' },
// 	{ label: 'Moskwa Domodiedowo (DME)' },
// 	{ label: 'Gothenburg (GOT)' },
// 	{ label: 'Walencja (VLC)' },
// 	{ label: 'Toulouse Blagnac Airport (TLS)' },
// 	{ label: 'Belgrad (BEG)' },
// 	{ label: 'Kijów Boryspol (KBP)' },
// 	{ label: 'Luksemburg (LUX)' },
// 	{ label: 'Bordeaux Merignac Airport (BOD)' },
// 	{ label: 'Bilbao Airport (BIO)' },
// 	{ label: 'Neapol (NAP)' },
// 	{ label: 'Billund Airport (BLL)' },
// 	{ label: 'Bazylea-Mulhouse-Freiburg (BSL)' },
// 	{ label: 'Norymberga (NUE)' },
// 	{ label: 'Alicante Airport (ALC)' },
// 	{ label: 'Kraków (KRK)' },
// 	{ label: 'Palma Mallorca (PMI)' },
// ];

//const autocompleter = require('autocompleter');
