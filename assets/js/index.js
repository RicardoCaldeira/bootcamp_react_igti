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
	
}