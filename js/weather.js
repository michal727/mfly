const input = document.querySelector('#weather-input');
const button = document.querySelector('#weather-btn');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const icon = document.querySelector('.weather-icon');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');

const today = new Date();
var date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
var time = today.getHours() + ':' + today.getMinutes();

// weather

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=0970fdd455a2a578a1bab591a8af05df';
const API_UNITS = '&units=metric';

const getWeather = () => {
	const city = input.value || 'Katowice';
	const URL = API_URL + city + API_KEY + API_UNITS;

	fetch(URL)
		.then((response) => response.json())
		.then((data) => {
			const city = data.name;
			cityName.textContent = city;

			const temp = data.main.temp;
			temperature.textContent = temp.toFixed() + '°C';

			warning.textContent = '';

			const weatherStatus = data.weather[0].id;

			if (weatherStatus >= 200 && weatherStatus < 300) {
				icon.setAttribute('src', './../images/weather/thunderstorm.jpg');
			} else if (weatherStatus >= 300 && weatherStatus < 400) {
				icon.setAttribute('src', './../images/weather/drizzle.jpg');
			} else if (weatherStatus >= 500 && weatherStatus < 600) {
				icon.setAttribute('src', './../images/weather/drizzle.jpg');
			} else if (weatherStatus >= 600 && weatherStatus < 700) {
				icon.setAttribute('src', './../images/weather/snow.jpg');
			} else if (weatherStatus >= 700 && weatherStatus < 800) {
				icon.setAttribute('src', './../images/weather/cloud.png');
			} else if (weatherStatus == 800) {
				icon.setAttribute('src', './../images/weather/clear.jpg');
			} else if (weatherStatus > 800 && weatherStatus < 900) {
				icon.setAttribute('src', './../images/weather/cloud.jpg');
			}
		})
		.catch((error) => {
			console.error('Niepoprawna nazwa miasta', error);
			warning.textContent = 'Niepoprawna nazwa miasta';
		});
};

button.addEventListener('click', getWeather);
window.addEventListener('load', getWeather);

// Time

const getTime = () => {
	document.querySelector('.current-date').innerHTML = date;
	document.querySelector('.current-time').innerHTML = time;
};

window.addEventListener('load', getTime);
