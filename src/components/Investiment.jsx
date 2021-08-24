export default function Investiment({report, previous}) {
	
	function getRendimentoMensal() {
		if (!previous) {
			return 0;
		}
		return (report.value - previous.value) * 100 / previous.value;
	}

	function calcRendimentoMensal() {
		if(!previous) {
			return "0,00%"
		} else {
			const rendimento = getRendimentoMensal();
			if (rendimento > 0) {
				return '+' + rendimento.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '%';
			} else {
				return rendimento.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '%';
			}
		}
	}
	return (
		<div className="border p-2">
			<span className="">{report.month < 10 ? 0 : ''}{report.month}/{report.year}</span>
			<span className="ml-10">R$ {report.value.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
			<span className={`${getRendimentoMensal() > 0 ? "green" : "red"} float-right`}>{calcRendimentoMensal()}</span>
		</div>
	)
}