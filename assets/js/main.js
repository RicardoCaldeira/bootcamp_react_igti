(() => {

	document.getElementById("combo").addEventListener("change", handleChanges);
	document.getElementById("today").addEventListener("change", handleChanges);

	(async () => {
		let response = await Promise.allSettled([
			fetch("https://api.covid19api.com/countries"),
			fetch("https://api.covid19api.com/summary")
		]);

		if (response[0].status == "fulfilled") {
			loadCountries(await response[0].value.json());
		}
		if (response[1].status == "fulfilled") {
			loadSummary(await response[1].value.json());
		}

	})();

	document.getElementById("today").defaultValue = new Date().toJSON().slice(0, 10);

})();

function loadCountries(countries) {

	const combo = document.getElementById("combo");

	countries.sort((a, b) => {
		const x = a.Country.toUpperCase();
		const y = b.Country.toUpperCase();

		return x === y ? 0 : x > y ? 1 : -1;
	});

	countries.forEach(country => {
		combo.options[combo.options.length] = new Option(
			country.Country,
			country.Country
		);
	});

}

function loadSummary(summary) {

	const totalConfirmados = document.getElementById("confirmed");
	const totalMortes = document.getElementById("death");
	const totalRecuperados = document.getElementById("recovered");
	const totalAtivos = document.getElementById("active");
	document.getElementById("actives").innerText = "Atualização";

	totalConfirmados.innerText = summary.Global.TotalConfirmed.toLocaleString("PT");
	totalMortes.innerText = summary.Global.TotalDeaths.toLocaleString("PT");
	totalRecuperados .innerText = summary.Global.TotalRecovered.toLocaleString("PT");

	const atualizacao = summary.Global.Date.slice(0, 10).split('-');
	totalAtivos.innerText = atualizacao[2] + '/' + atualizacao[1] + '/' + atualizacao[0];

}

function handleChanges() {

	let country = document.getElementById("combo").value;

	if (country != "Global") {
		let startDate = new Date(document.getElementById("today").value);

		let endDate = new Date(
			startDate.getFullYear(),
			startDate.getMonth(),
			startDate.getDate() + 1,
			-3,
			0,
			1,
			0
		);

		startDate = new Date(
			startDate.getFullYear(),
			startDate.getMonth(),
			startDate.getDate() - 1,
			-3,
			0,
			0,
			0
		);
		fetch(`https://api.covid19api.com/country/${country}?from=${startDate.toISOString()}&to=${endDate.toISOString()}`)
			.then((response) => response.json())
			.then((json) => loadData(json));
	}
}

function loadData(data) {

	console.log(data);

	let yConfirmedDelta = data[1].Confirmed - data[0].Confirmed;
	let yDeathsDelta = data[1].Deaths - data[0].Deaths;
	let yRecoveredDelta = data[1].Recovered - data[0].Recovered;
	let yActiveDelta = data[1].Active - data[0].Active;

	let tConfirmedDelta = data[2].Confirmed - data[1].Confirmed;
	let tDeathsDelta = data[2].Deaths - data[1].Deaths;
	let tRecoveredDelta = data[2].Recovered - data[1].Recovered;
	let tActiveDelta = data[2].Active - data[1].Active;

	document.getElementById("confirmed").innerText =
		data[2].Confirmed.toLocaleString("PT");
	document.getElementById("death").innerText =
		data[2].Deaths.toLocaleString("PT");
	document.getElementById("recovered").innerText =
		data[2].Recovered.toLocaleString("PT");
	document.getElementById("active").innerText =
		data[2].Active.toLocaleString("PT");
	
	document.getElementById("actives").innerText = "Total Ativos";
	
	insertDailyData("tconfirmed", tConfirmedDelta, tConfirmedDelta > yConfirmedDelta);

	insertDailyData("tdeath", tDeathsDelta, tDeathsDelta > yDeathsDelta);

	insertDailyData("trecovered", tRecoveredDelta, tRecoveredDelta > yRecoveredDelta);

	insertDailyData("tactive", tActiveDelta, tActiveDelta > yActiveDelta);

}

function insertDailyData(element, value, increase) {

	if (increase) {
		document.getElementById(element).innerHTML = `
		<img src= 'assets/img/up.png'> Diário ${value.toLocaleString("PT")}`
	} else {
		document.getElementById(element).innerHTML = `
		<img src= 'assets/img/down.png'> Diário ${value.toLocaleString("PT")}`
	} 
}