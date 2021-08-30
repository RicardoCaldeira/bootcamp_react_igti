export default function Select({
    cities = [],
    onCitySelect = null
}) {

    function handleCitySelect(e) {
        if (onCitySelect) {
            onCitySelect(e.target.value);
        }
    }

    return (
        <div>
            <select onChange={handleCitySelect}>
                {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                ))}
            </select>
        </div>
    )
}
