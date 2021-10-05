export default function Team({pos, team}) {
	return (
		<>
			<td>{pos}</td>
			<td><img src={`../../img/${team.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(" ", "_")}.png`} width="25px"/></td>
			<td>{team.name}</td>
			<td>{team.pontuacao_geral.total_pontos}</td>
			<td>{team.pontuacao_geral.total_vitorias}</td>
			<td>{team.pontuacao_geral.total_empates}</td>
			<td>{team.pontuacao_geral.total_derrotas}</td>
			<td>{team.pontuacao_geral.total_gols_marcados}</td>
			<td>{team.pontuacao_geral.total_gols_sofridos}</td>
			<td>{team.pontuacao_geral.saldo}</td>
		</>
	)
}
