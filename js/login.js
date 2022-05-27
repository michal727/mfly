// fetch users  from json.file
let jsondata = '';
let apiUrl = '/data/users.json';

async function getJson(url) {
	let response = await fetch(url);
	let users = await response.json();
	return users;
}
async function getUsers() {
	jsondata = await getJson(apiUrl);
}
getUsers();

const getLoginData = () => {
	const username = document.querySelector('#userpassword').value;
	const password = document.querySelector('#userpassword').value;
	const error = document.getElementById('login-error');

	usersData = jsondata;

	for (i = 0; i < usersData.length; i++) {
		if (username == usersData[i].username && password == usersData[i].password) {
			document.querySelector('#step-one').style.display = 'none';
			document.querySelector('#step-two').style.display = 'block';
		} else {
			error.innerHTML = '<i class="ti ti-alert-circle"></i> Błędny login lub hasło';
		}
	}
};
