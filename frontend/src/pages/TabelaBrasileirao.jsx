import Header from '../components/Header';
import { useEffect, useState } from "react";
import Select from "../components/Select";
import _ from "lodash";

import { apiGetChampionshipYearData } from '../services/apiService'

export default function TabelaBrasileirao() {

	const years = [
		2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015
	]
	const [year, setYear] = useState(years[0]);
	const [teamsData, setTeamsData] = useState([]);

	useEffect(() => {
		async function getData() {
			try {
				let backendData = await apiGetChampionshipYearData(year);

				backendData = _.maxBy(backendData, "numero");
				
				let teams = [];	
				backendData.partidas.forEach(partida => {

					const team = {
						name: "",
						pontuacao_geral: {},
					};
	
					const team2 = {
						name: "",
						pontuacao_geral: {},
					};

					team.name = partida.mandante;
					team.pontuacao_geral = partida.pontuacao_geral_mandante;
					const saldo = partida.pontuacao_geral_mandante.total_gols_marcados - partida.pontuacao_geral_mandante.total_gols_sofridos;
					team.pontuacao_geral = {...team.pontuacao_geral, "saldo": saldo}
					teams.push(team);

					team2.name = partida.visitante;
					team2.pontuacao_geral = partida.pontuacao_geral_visitante;
					const saldo2 = partida.pontuacao_geral_visitante.total_gols_marcados - partida.pontuacao_geral_visitante.total_gols_sofridos;
					team2.pontuacao_geral = {...team2.pontuacao_geral, "saldo": saldo2}
					teams.push(team2);
				});

				const timesOrdenados = _.orderBy(
					teams,
					["pontuacao_geral.total_pontos", "pontuacao_geral.total_vitorias", "pontuacao_geral.saldo", "pontuacao_geral.total_gols_marcados"],
					["desc", "desc", "desc", "desc"]
				);

				console.log("ordenados", timesOrdenados);

				setTeamsData(teams);

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

			{console.log(teamsData)}
		</div>
	)
}


/*  data.sort((a, b) => {
        let x = a.Country.toUpperCase();
        let y = b.Country.toUpperCase();

        return x === y ? 0 : x > y ? 1 : -1;
    });

	let countriesDeathsSorted = _.orderBy(
    json.Countries,
    ["TotalDeaths", "Country"],
    ["desc", "asc"]
  );
*/
