const departureSeleced = localStorage.getItem('departureSeleced');
const arrivalSeleced = localStorage.getItem('arrivalSeleced');
const airlineSeleced = localStorage.getItem('airlineSeleced');
const flightPrice = localStorage.getItem('flightPrice');
const numberOfPassengers = localStorage.getItem('passengers');
const flightDate = localStorage.getItem('flightDate');

window.addEventListener('load', () => {
	// document.querySelector('.departure').textContent = departureSeleced;
	// document.querySelector('.arrival').textContent = arrivalSeleced;
	const departureNodeList = document.querySelectorAll('.departure');
	const arrivalNodeList = document.querySelectorAll('.arrival');
	for (let i = 0; i < departureNodeList.length; i++) {
		departureNodeList[i].textContent = departureSeleced;
		arrivalNodeList[i].textContent = arrivalSeleced;
	}
	const airlineLogo = document.querySelector('.airline-logo').classList.add(airlineSeleced);
	const data = (document.querySelector('.date').textContent = flightDate);
});

const planeRow = document.querySelector('.plane');
const seats = document.querySelectorAll('.seat:not(.occupied)');
const seatsCount = document.querySelector('.seats-count');
const seatsPrice = document.querySelector('.seats-price');

// SEAT SELECTION

let selectedSeatsNumber;

let totalPrice = parseInt(flightPrice) * numberOfPassengers;
let totalPriceInfo = document.querySelector('.total-price-info');
totalPriceInfo.textContent = totalPrice;

let seatsRemaining = numberOfPassengers;
let seatsRemainingInfo = document.querySelector('.seats-remaining-info');
seatsRemainingInfo.textContent = seatsRemaining;

planeRow.addEventListener('click', (e) => {
	// selecting seat from gui
	let selectedSeats = document.querySelectorAll('.seat.selected');
	selectedSeatsNumber = selectedSeats.length + 1;

	if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied') && !e.target.classList.contains('selected') && selectedSeatsNumber <= numberOfPassengers) {
		e.target.classList.add('selected');
		// add choosen seat to side list
		const selectedSeatId = e.target.getAttribute('id');
		const liItem = document.createElement('li');
		document.querySelector('.selected-seats-list').appendChild(liItem);
		liItem.textContent = selectedSeatId;
		liItem.setAttribute('id', selectedSeatId);
		// update price
		totalPrice += 20;
		totalPriceInfo.textContent = totalPrice;
		// update seats remaining info
		seatsRemaining--;
		seatsRemainingInfo.textContent = seatsRemaining;
	} else if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied') && e.target.classList.contains('selected')) {
		// remove seat from gui and side list
		e.target.classList.remove('selected');
		const selectedSeatsList = document.querySelector('.selected-seats-list');
		const selectedSeatId = e.target.getAttribute('id');
		const SeatId = selectedSeatsList.querySelector(`#${selectedSeatId}`);
		selectedSeatsList.removeChild(SeatId);
		// update price
		totalPrice -= 20;
		totalPriceInfo.textContent = totalPrice;
		// update seats remaining info
		seatsRemaining++;
		seatsRemainingInfo.textContent = seatsRemaining;
	}
});

// BAGGAGE SELECTION

for (let i = 1; i <= numberOfPassengers; i++) {
	document.querySelector('.baggages').innerHTML += ` 

	<div class="baggage-item">
		<h6>Pasażer ${i}</h6>
		<div class="row pb-3">
			<div class="col-9 d-flex align-items-center">
				<div class="form-check">
					<input class="form-check-input" type="checkbox" value="" checked="checked"
						disabled="disabled" id="cabin-bag">
					<label class="form-check-label" for="cabin-bag">
						<span> <i class="ti ti-backpack"></i> </span>
						<div class="baggage-name">
							<div class='baggage-type'>Mały bagaż podręczny
							</div>
							<div class='baggage-dismension'> 40 × 25 × 20 cm, max 10 kg
							</div>
						</div>
					</label>

				</div>
			</div>

			<div class="col-3 d-flex align-items-center">
				<div class="cabin-baggage-price text-success">W cenie</div>
			</div>
		</div>

		<div class="row">
			<div class="col-9 d-flex align-items-center">
				<div class="form-check">
					<input class="form-check-input" type="checkbox" value="" id="checked-bag">
					<label class=" form-check-label" for="checked-bag">
						<span> <i class="ti ti-luggage"></i> </span>
						<div class="baggage-name">
							<div class='baggage-type'> Bagaż rejestrowany </div>
							<div class='baggage-dismension'> 119 × 119 × 81 cm, max 20 kg
							</div>
						</div>
					</label>
				</div>
			</div>
			<div class="col-3 d-flex align-items-center">
				<div class="cabin-baggage-price"> 150 zł</div>

			</div>
		</div>
	</div>
	`;
}

// add choosen luggage to side list

const checkbox = document.querySelectorAll('input[id=checked-bag]');

checkbox.forEach((item) => {
	item.addEventListener('change', (event) => {
		if (item.checked) {
			// add choosen baggage to side list
			const liItem = document.createElement('li');
			liItem.textContent = '1x bagaż rejestrowany 20kg';
			document.querySelector('.selected-baggage-list').appendChild(liItem);
			totalPrice += 150;
			totalPriceInfo.textContent = totalPrice;
		} else {
			// remove 1 baggage from side list
			const baggageList = document.querySelector('.selected-baggage-list');
			const selectedBaggage = baggageList.querySelectorAll('li');
			baggageList.removeChild(selectedBaggage[selectedBaggage.length - 1]);
			totalPrice -= 150;
			totalPriceInfo.textContent = totalPrice;
		}
	});
});

// seat select validation

const validateSeats = () => {
	return new Promise((resolve) => {
		const error = document.getElementById('seat-error');
		if (selectedSeatsNumber == numberOfPassengers) {
			resolve('siedzenia wybrane');
			error.innerHTML = '';
		} else {
			error.innerHTML = '<i class="ti ti-alert-circle"></i> Wybierz miejsca dla wszystkich pasażerów';
		}
	});
};

const validateCheckbox = () => {
	const checkbox = document.getElementById('terms');
	return new Promise((resolve) => {
		const error = document.getElementById('checkbox-error');
		if (checkbox.checked) {
			resolve('checkbox zaznaczony');
			error.innerHTML = '';
		} else {
			error.innerHTML = '<i class="ti ti-alert-circle"></i> Zaakceptuj regulamin';
		}
	});
};

//

// activate final button  - function submit() is assigned in html
const finalButton = document.querySelector('#final-button');

async function submit() {
	await validateSeats();
	await validateCheckbox();
	openPopup();
}

// popup

const editBtn = document.querySelector('#btn-edit');
const closeBtn = document.querySelector('#btn-close');
const popup = document.querySelector('#popup');
const backdrop = document.querySelector('.backdrop');

const openPopup = () => {
	popup.style.display = 'block';
	backdrop.style.display = 'block';
};

closeBtn.addEventListener('click', () => {
	popup.style.display = 'none';
	backdrop.style.display = 'none';
});

backdrop.addEventListener('click', () => {
	popup.style.display = 'none';
	backdrop.style.display = 'none';
});
