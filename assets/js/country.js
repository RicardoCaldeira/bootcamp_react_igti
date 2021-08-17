let linhas = document.getElementById("linhas");
var myChart = new Chart(linhas, {
	type: 'line',
	data: {
		labels: [], // dias escolhidos
		datasets: []
	},
	options: {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: 'top'
			},
			title: {
				display: true,
				text:"Curva diária de Covid-19"
			}
		}
	}
});

(()=>{
	
	(async () => {
		const countries = await axios.get("https://api.covid19api.com/countries");
		loadCountries(countries.data);
	})();

})();

function loadCountries(countries) {

	const combo = document.getElementById("cmbCountry");

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

function aplicar() {

	let dataInicio = document.getElementById("date_start").value;
	const dataFim = document.getElementById("date_end").value;
	const pais = document.getElementById("cmbCountry").value;
	const dados = document.getElementById("cmbData").value;

	dataInicio = dataInicio.split('-');

	console.log(dataFim);
	dataInicio = `${dataInicio[0]}-${dataInicio[1]}-${dataInicio[2]-1}`; // tratar pra quando for dia 1º
	console.log(dataInicio);

	(async () => {
		const countryData = await axios.get(`https://api.covid19api.com/country/${pais}?from=${dataInicio}&to=${dataFim}`);
		loadKpis(countryData.data);
		loadChart(countryData.data, dados)
	})();

}

function loadKpis(kpis) {

	document.getElementById("kpiconfirmed").innerText = kpis[kpis.length-1].Confirmed.toLocaleString("PT");

	document.getElementById("kpideaths").innerText = kpis[kpis.length-1].Deaths.toLocaleString("PT");

	document.getElementById("kpirecovered").innerText = kpis[kpis.length-1].Recovered.toLocaleString("PT");
	
}

function loadChart(countryData, dados) {

	myChart.destroy();

	let days = [];
	
	let deaths = [];
	let deathsSum = 0;

	let confirmed = [];
	let confirmedSum = 0;

	let recovered = [];
	let recoveredSum = 0;

	for (let i = 1; i < countryData.length; i++) {
		const data = countryData[i].Date.slice(0, 10).split('-');
		days.push(data[2] + '/' + data[1] + '/' + data[0]);

		deaths.push(countryData[i].Deaths - countryData[i-1].Deaths);
		deathsSum += countryData[i].Deaths - countryData[i-1].Deaths;

		confirmed.push(countryData[i].Confirmed - countryData[i-1].Confirmed);
		confirmedSum += countryData[i].Confirmed - countryData[i-1].Confirmed;
		
		recovered.push(countryData[i].Recovered - countryData[i-1].Recovered);
		recoveredSum += countryData[i].Recovered - countryData[i-1].Recovered;
	}

	let datasetsAux = [{}];
	if (dados === "Confirmed") {
		datasetsAux = [{
			label: `Número de casos confirmados`,
			data: confirmed,
			backgroundColor: 'rgb(60, 186, 159, 0.1)', //amarelo,
			borderColor: 'rgb(60, 186, 159)'
		},
		{
			label: `Média de casos confirmados`,
			data: [],
			backgroundColor: 'rgb(255, 140, 13, 0.1)',
			borderColor: 'rgb(255, 140, 13)'
		}];
		for (let i = 0; i < countryData.length; i++) {
			datasetsAux[1].data.push(confirmedSum / countryData.length);
		}
	} else if (dados === "Deaths") {
		datasetsAux = [{
			label: `Número de mortes`,
			data: deaths,
			backgroundColor: 'rgb(60, 186, 159, 0.1)',
			borderColor: 'rgb(60, 186, 159)'
		},
		{
			label: `Média de mortes`,
			data: [],
			backgroundColor: 'rgb(255, 140, 13, 0.1)',
			borderColor: 'rgb(255, 140, 13)'
		}];
		for (let i = 0; i < countryData.length; i++) {
			datasetsAux[1].data.push(deathsSum / countryData.length);
		}
	} else {
		datasetsAux = [{
			label: `Número de casos recuperados`,
			data: recovered,
			backgroundColor: 'rgb(60, 186, 159, 0.1)',
			borderColor: 'rgb(60, 186, 159)'
		},
		{
			label: `Média de casos recuperados`,
			data: [],
			backgroundColor: 'rgb(255, 140, 13, 0.1)',
			borderColor: 'rgb(255, 140, 13)'
		}];
		for (let i = 0; i < countryData.length; i++) {
			datasetsAux[1].data.push(recoveredSum / countryData.length);
		}
	}

	//let linhas = document.getElementById("linhas");
	myChart = new Chart(linhas, {
		type: 'line',
		data: {
			labels: days, // dias escolhidos
			datasets: datasetsAux
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					display: true,
					position: 'top'
				},
				title: {
					display: true,
					text:"Curva diária de Covid-19"
				}
			}
		}
	});

}