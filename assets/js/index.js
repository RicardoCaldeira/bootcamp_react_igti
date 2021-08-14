(()=>{
	
	(async () => {
		const kpis = await axios.get("https://api.covid19api.com/summary");
		console.log(kpis.data);
		loadKpis(kpis.data);
	})();

})();

function loadKpis(kpis) {

	const totalConfiramos = document.getElementById("confirmed");
	totalConfiramos.innerText = kpis.Global.TotalConfirmed.toLocaleString("PT");

	const totalMortes = document.getElementById("death");
	totalMortes.innerText = kpis.Global.TotalDeaths.toLocaleString("PT");

	const totalRecuperados = document.getElementById("recovered");
	totalRecuperados.innerText = kpis.Global.TotalRecovered.toLocaleString("PT");

	loadPizza(kpis);
	
}

function loadPizza(kpis) {
	var pizza = document.getElementById('pizza');
	var myChart = new Chart(pizza, {
		type: 'pie',
		data: {
			labels: ['Confirmados', 'Recuperados', 'Mortes'],
			datasets: [{
				label: '# of Votes',
				data: [12, 19, 3],
				backgroundColor: [
					'rgba(255, 99, 132)',//red
					'rgba(54, 162, 235)',//blue
					'rgba(255, 206, 86)'//yellow
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top'
				},
				title: {
					display: true,
					text: "Distribuição de novos casos"
				}
			}
		}
	});
}