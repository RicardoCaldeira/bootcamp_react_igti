(()=>{
	
	(async () => {
		const countries = await axios.get("https://api.covid19api.com/countries");
		console.log(countries.data);
		//loadKpis(kpis.data);
		// const kpis = await axios.get("https://api.covid19api.com/summary");
		
	})();

})();