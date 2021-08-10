(() => {

	//document.getElementById("combo");//.addEventListener("change", handlerChange);
	//document.getElementById("today");//.addEventListener("change", handlerChange);

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