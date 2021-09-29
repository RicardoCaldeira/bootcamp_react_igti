export default function Select({
    years = [],
    onYearSelect = null
}) {

    function handleYearSelect(e) {
        if (onYearSelect) {
            onYearSelect(e.target.value);
        }
    }

    return (
        <div>
            <select onChange={handleYearSelect}>
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
    )
}
