export default function Select({cities}) {

    console.log(cities);

    return (
        <div>
            <select>
                {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                ))}
            </select>
        </div>
    )
}
