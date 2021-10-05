export default function Team({pos, team}) {
	return (
		<>
			<td>{pos}</td>
			<td><img src={`../../img/${team.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(" ", "_")}.png`} width="25px"/></td>
			<td>{team.name}</td>
			<td>81</td>
			<td>28</td>
			<td>7</td>
			<td>5</td>
			<td>80</td>
			<td>28</td>
			<td>52</td>
		</>
	)
}
