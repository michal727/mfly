// fetch flight data from json.file
let jsondata = '';
let apiUrl = '/data/flights.json';

async function getJson(url) {
	let response = await fetch(url);
	let data = await response.json();
	return data;
}
async function getFlights() {
	jsondata = await getJson(apiUrl);
}
getFlights();

//global elements select
const departure = document.querySelector('#departure');
const arrival = document.querySelector('#arrival');
const departureDate = document.getElementById('departure-date');
const weatherInput = document.querySelector('#weather-input');

//show and hide arrival options, depending on selected departure city
const displayArrivalCities = () => {
	if (departure.value == 'Katowice') {
		arrival.innerHTML = `
			<option>Ateny</option>
			<option>Dublin</option>
			<option>Kolonia</option>
			<option>Korfu</option>
			<option>Malta</option>
			<option>Pafos</option>
			`;
	}
	if (departure.value == 'Kraków') {
		arrival.innerHTML = `
			<option>Barcelona</option>
			<option>Berlin</option>
			<option>Londyn</option>
			<option>Malta</option>
			<option>Palma</option>
			`;
	}
	if (departure.value == 'Poznań') {
		arrival.innerHTML = `
			<option>Barcelona</option>
			<option>Londyn</option>
			<option>Palma</option>
			<option>Paryż</option>
			<option>Rzym</option>
			`;
	}
	if (departure.value == 'Warszawa') {
		arrival.innerHTML = `
			<option>Ateny</option>
			<option>Barcelona</option>
			<option>Londyn</option>
			<option>Neapol</option>
			<option>Paryż</option>
			`;
	}
	if (departure.value == 'Wrocław') {
		arrival.innerHTML = `
			<option>Barcelona</option>
			<option>Sztokholm</option>
			<option>Korfu</option>
			<option>Londyn</option>
			<option>Paryż</option>
			`;
	}
};
departure.addEventListener('change', displayArrivalCities);

//special offerts select
const specialOffer = (dep, arr) => {
	departure.value = dep;
	displayArrivalCities();
	arrival.value = arr;
	window.scrollTo(0, 0);
	main();
};

//loading animation
function showLoader() {
	document.querySelector('.loading').style.display = 'flex';
}
const hideLoader = () => {
	document.querySelector('.loading').style.display = 'none';
};

// search form validation
const validate = () => {
	return new Promise((resolve) => {
		const error = document.getElementById('departure-error');
		if (departure.value !== '0') {
			resolve();
			error.innerHTML = '';
		} else {
			error.innerHTML = '<i class="ti ti-alert-circle"></i> Wybierz lotnisko';
		}
	})
		.then(() => {
			return new Promise((resolve) => {
				const error = document.getElementById('arrival-error');
				if (arrival.value !== '0') {
					resolve();
					error.innerHTML = '';
				} else {
					error.innerHTML = '<i class="ti ti-alert-circle"></i> Wybierz lotnisko';
				}
			});
		})
		.then(() => {
			return new Promise((resolve) => {
				const error = document.getElementById('date-error');
				if (departureDate.value !== '') {
					resolve();
					error.innerHTML = '';
				} else {
					error.innerHTML = '<i class="ti ti-alert-circle"></i> Wybierz datę';
				}
			});
		});
};

// clear results
const clearResults = function () {
	document.querySelector('.search-results').innerHTML = '';
};

// search engine - get results
const getresults = function () {
	const inputDeparture = departure.value;
	const inputArrival = arrival.value;
	const inputDate = departureDate.value;

	clearResults();
	hideLoader();

	flightdata = jsondata;

	if (inputDeparture.length > 0) {
		for (let i = 0; i < flightdata.length; i++) {
			if (flightdata[i].departure.toLowerCase().includes(inputDeparture.toLowerCase()) && flightdata[i].arrival.toLowerCase().includes(inputArrival.toLowerCase())) {
				document.querySelector('.search-results').innerHTML += `
                <div class="card results">
                    <div class="card-body">
                        <div class="row gx-2 search-results-item">
                            <div class='col-sm-6 route-col'>
                                <div class="route-${[i]}">
                                    <span class="departure-time">${flightdata[i].dep_time}</span>
									<span class='departure-${[i]}'>${flightdata[i].departure}</span>
									<span class="line"></span>
									<span class="arrival-time">${flightdata[i].arr_time} </span>
									<span class='arrival-${[i]}'>${flightdata[i].arrival}</span>
                                </div>
                                <div class="flight-date">${inputDate}</div>
                            </div> 
                            <div class='col-sm-2 logo-col'> 
                                <div class='airline-logo ${flightdata[i].airline}'></div>
                            </div> 
                            <div class='col-sm-2 price-col'> 
                                <div class="price"> ${flightdata[i].price} <span> zł</span></div>
								<div class="per-person"> os. </div>
                            </div> 
                            <div class='col-sm-2 pick-col'> 
                                <a href="/reservation" role="button" class='btn btn-warning width100' onclick='getValues(${[i]})'> Wybierz </a>  
                            </div> 
                        </div>
                    </div>
                </div>
                `;
			}
		}
	}
	weatherInput.value = inputArrival;
};

// main function of searcher. Loading and get results
async function main() {
	clearResults();
	await validate();
	showLoader();
	await new Promise((resolve) => setTimeout(resolve, 700));
	getresults();
	getWeather();
}
document.querySelector('#search-button').addEventListener('click', main);

// export specific data from selected flight by index numbers, send to reservation subpage.
const getValues = (i) => {
	const passengers = document.querySelector('#passengers').value;
	const departureSeleced = document.querySelector(`.departure-${[i]}`).textContent;
	const arrivalSeleced = document.querySelector(`.arrival-${[i]}`).textContent;
	const flightDate = document.querySelector('.flight-date').textContent;
	const airlineSeleced = flightdata[i].airline;
	const flightPrice = flightdata[i].price;
	localStorage.setItem('departureSeleced', departureSeleced);
	localStorage.setItem('arrivalSeleced', arrivalSeleced);
	localStorage.setItem('airlineSeleced', airlineSeleced);
	localStorage.setItem('flightPrice', flightPrice);
	localStorage.setItem('flightDate', flightDate);
	localStorage.setItem('passengers', passengers);
};
