import { useEffect, useState } from "react";
import Header from "../components/Header";
import Select from "../components/Select";


import { apiGetAllCities } from "../services/apiService";

export default function ElectionsPage() {

    const [cities, setCities] = useState([]);

    useEffect(() => {
    
        async function getCities() {
          try {
            setCities(await apiGetAllCities());
          } catch (error) {
            //setError(error.message);
          }
        };

        getCities();

    }, []);

    return (
        <div>
            <Header>react-elections</Header>
            <main>
                <div className="container mx-auto p-4 text-center">
                    <h2>Escolha o município</h2>
                    <Select cities={cities}></Select>
                </div>
            </main>
        </div>
    )
}
