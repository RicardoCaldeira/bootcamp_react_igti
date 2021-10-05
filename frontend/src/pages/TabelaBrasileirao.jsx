import Header from '../components/Header';
import { useEffect, useState } from "react";
import Select from "../components/Select";
import _ from "lodash";

import { apiGetChampionshipYearData } from '../services/apiService'
import Team from '../components/Team';

export default function TabelaBrasileirao() {

	const years = [
		2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015
	]
	const [year, setYear] = useState(years[0]);
	const [teamsData, setTeamsData] = useState([]);
	const [loading, setLoading] = useState(true);

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

				teams = _.orderBy(
					teams,
					["pontuacao_geral.total_pontos", "pontuacao_geral.total_vitorias", "pontuacao_geral.saldo", "pontuacao_geral.total_gols_marcados"],
					["desc", "desc", "desc", "desc"]
				);

				setTeamsData(teams);
				setLoading(false);
			} catch (error) {
				// setError(error.message);
			}
		}
		getData();
	}, []);

	useEffect(() => {
		async function getData() {
			try {
				setLoading(true);
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

				teams = _.orderBy(
					teams,
					["pontuacao_geral.total_pontos", "pontuacao_geral.total_vitorias", "pontuacao_geral.saldo", "pontuacao_geral.total_gols_marcados"],
					["desc", "desc", "desc", "desc"]
				);

				setTeamsData(teams);
				setLoading(false);

			} catch (error) {
				// setError(error.message);
			}
		}
		getData();

	}, [year]);

	function handleYearSelect(selectedYear) {
		setYear(selectedYear);
	}

	let mainJsx = (
		<div className="flex justify-center my-4">
		  Carregando...
		</div>
	);

	if (!loading) {
		mainJsx = (
			<div className="mb-5">
				<div className="mx-auto p-4 text-center">
					<Select years={years}
						onYearSelect={handleYearSelect}
						selectedYear={year}
					/>
					<br/>
					<h2>Classificação do campeonato brasileiro de {year}</h2>
				</div>

				<div className="flex justify-center mt-5">
					<table>
						<thead>
							<tr className="">
								<th>{''}</th>
								<th>{''}</th>
								<th>{''}</th>
								<th>P</th>
								<th>V</th>
								<th>E</th>
								<th>D</th>
								<th>GP</th>
								<th>GC</th>
								<th>S</th>
							</tr>
						</thead>

						<tbody>
							{teamsData.map((team, index) => (
								<tr key={index}><Team pos={index+1} team={team}></Team></tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		)
	}

	return (
		<>
			<Header>tabela-brasileirão</Header>
			<main>{mainJsx}</main>
		</>
	)
}