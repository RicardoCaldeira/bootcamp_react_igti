import Header from '../components/Header';
import { useEffect, useState } from "react";
import Select from "../components/Select";

import { apiGetChampionshipYearData } from '../services/apiService'

export default function TabelaBrasileirao() {

	const years = [
		2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015
	]
	const [year, setYear] = useState(years[0]);
	const [data, setData] = useState([]);

	useEffect(() => {
		async function getData() {
			try {
				const backendData = await apiGetChampionshipYearData(year);
				setData(backendData);

			} catch (error) {
				// setError(error.message);
			}
		}
		getData();

	}, []);

	function handleYearSelect(selectedYear) {
		console.log(selectedYear);
	}

	return (
		<div>
			<Header>tabela-brasileirão</Header>
			<main>
				<div className="container mx-auto p-4 text-center">
					<Select years={years}
						onYearSelect={handleYearSelect}
					/>
					<br/>
					<h2>Classificação do campeonato brasileiro de {year}</h2>
				</div>
			</main>

			{console.log(data)}
		</div>
	)
}
