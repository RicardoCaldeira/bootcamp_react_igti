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

	const dataAtualizacao = document.getElementById("date");
	const atualizacao = kpis.Date.slice(0, 10).split('-');
	dataAtualizacao.innerText = atualizacao[2] + '/' + atualizacao[1] + '/' + atualizacao[0];


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
				//label: '# of Votes',
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

	var bars = document.getElementById('barras');
	var myBarsChart = new Chart(bars, {
		type: 'bar',
		data: {
			labels: [
				top10[0].Country, top10[1].Country, top10[2].Country, top10[3].Country, top10[4].Country, top10[5].Country, top10[6].Country, top10[7].Country, top10[8].Country, top10[9].Country
			],
			datasets: [{
				//label: null,
				data: [
					top10[0].TotalDeaths, top10[1].TotalDeaths, top10[2].TotalDeaths, top10[3].TotalDeaths, top10[4].TotalDeaths, top10[5].TotalDeaths, top10[6].TotalDeaths, top10[7].TotalDeaths, top10[8].TotalDeaths, top10[9].TotalDeaths
				],
				backgroundColor: [
					'rgba(153, 102, 255)'
				],
				borderColor: [
					'rgba(153, 102, 255, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			},
			responsive: true,
			plugins: {
				legend: {
					position: 'top'
				},
				title: {
					display: true,
					text: "Total de mortes por país - Top 10"
				}
			}
		}
	});
}