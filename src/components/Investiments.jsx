import { ALL_REPORTS } from "../data/investiments_data";
import _ from "lodash";

import Investiment from "./Investiment";

export default function Investiments({id = 0, description = null}) {

	function getRendimentoAnual() {
		const rendimento = (reports[11].value - reports[0].value) * 100 / reports[0].value;
		if(rendimento > 0) {
			return `+${rendimento.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}%`
		}
		return `${rendimento.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}%`
	}
	
	let reports = [];
	ALL_REPORTS.reports.forEach(r => {
		if(r.investmentId === id) {
			reports.push(r);
		}
	});
	reports = _.orderBy(reports, ["month"], ["asc"]);

	return (
		<>
			<div style={{textAlign: "center"}}>
				<h1>{description}</h1>
				<h2 className={(reports[11].value - reports[0].value) > 0 ? "green" : "red"}>Rendimento total: {(reports[11].value - reports[0].value).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}({getRendimentoAnual()})</h2>
			</div>

			<div className="">
				{reports.map((report, index) => (
					<li key={report.id}><Investiment report={report} previous={index > 0 ? reports[index-1] : null}></Investiment></li>
				))}
			</div>
		</>
	)
}
