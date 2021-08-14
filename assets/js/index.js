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
	loadBars(kpis);

}

function loadPizza(kpis) {
	var pizza = document.getElementById('pizza');
	var myPieChart = new Chart(pizza, {
		type: 'pie',
		data: {
			labels: ['Confirmados', 'Recuperados', 'Mortes'],
			datasets: [{
				label: '# of Votes',
				data: [
					kpis.Global.TotalConfirmed,
					kpis.Global.TotalRecovered,
					kpis.Global.TotalDeaths
				],
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

function loadBars(kpis) {

	let top10 = [];

	for (let i = 0; i < 10; i++) {
		let pos = kpis.Countries.indexOf( _.maxBy(kpis.Countries, (c)=> {return c.TotalDeaths}));
		top10[i] = kpis.Countries[pos];
		kpis.Countries.splice(pos, 1);
	}

	for (let i = 0; i < top10.length; i++) {
		console.log(top10[i]);
	}

	var bars = document.getElementById('barras');
	var myBarsChart = new Chart(bars, {
		type: 'bar',
		data: {
			labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
			datasets: [{
				label: '# of Votes',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	});
}