import { useEffect, useState } from "react";
import Header from "../components/Header";
import Select from "../components/Select";


import { apiGetAllCandidates, apiGetAllCities, apiGetAllElections } from "../services/apiService";

export default function ElectionsPage() {

  const [cities, setCities] = useState([]);
  const [election, setElection] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("680df3f5-c5bf-48ae-bda0-5b667fd89197");

  useEffect(() => {
      async function getData() {
        try {
          setCities(await apiGetAllCities());
          
          const allElection = await apiGetAllElections();
          setElection(allElection.filter((election) => {return election.cityId === selectedCityId}));

          const allCandidates = await apiGetAllCandidates();
          let candidatesAux = [];
          election.forEach(e => {
            candidatesAux.push(allCandidates.filter((cand) => {return e.candidateId === cand.id }))
          });
          setCandidates(candidatesAux);
          console.log(candidatesAux);

        } catch (error) {
          //setError(error.message);
        }
      }
      getData();

  }, []);

  function handleCitySelect(selectedCity) {
    //console.log(selectedCity);
  }

  return (
      <div>
          <Header>react-elections</Header>
          <main>
              <div className="container mx-auto p-4 text-center">
                  <h2>Escolha o município</h2>
                  <Select cities={cities}
                    onCitySelect={handleCitySelect}
                  />
              </div>
              <div className="p-4 border m-4">

              </div>
          </main>
      </div>
  )
}
