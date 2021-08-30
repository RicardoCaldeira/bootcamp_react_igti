import { useEffect, useState } from "react";
import Header from "../components/Header";
import Select from "../components/Select";


import { apiGetAllCandidates, apiGetAllCities, apiGetAllElections } from "../services/apiService";

export default function ElectionsPage() {

  const [cities, setCities] = useState([]);
  const [election, setElection] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("680df3f5-c5bf-48ae-bda0-5b667fd89197");
  const [city, setCity] = useState({});
  const [allElections, setAllElections] = useState([]);
  const [allCandidates, setAllCandidates] = useState([]);

  useEffect(() => {
      async function getData() {
        try {

          setCities(await apiGetAllCities());
          setCity(cities.filter((c)=> c.id === selectedCityId));

          setAllElections(await apiGetAllElections());
          const electionAux = allElections.filter((election) => {return election.cityId === selectedCityId})
          setElection(electionAux.sort((a, b) => a-b));

          setAllCandidates (await apiGetAllCandidates());
          let candidatesAux = [];
          election.forEach(e => {
            candidatesAux.push(allCandidates.filter((cand) => {return e.candidateId === cand.id }))
          });
          setCandidates(candidatesAux);

        } catch (error) {
          // setError(error.message);
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
                <div className="text-center">
                  <h2 className="font-bold">{`Eleição em ${city[0].name}`}</h2>
                  <div className="flex flex-row space-x-2 justify-center m-2">
                    <span className="font-semibold">{`Total de eleitores: `}</span>{city[0].votingPopulation.toLocaleString("pt-BR")}
                    <span className="font-semibold">{`Abstenção: `}</span>{city[0].absence.toLocaleString("pt-BR")}
                    <span className="font-semibold">{`Abstenção: `}</span>{city[0].presence.toLocaleString("pt-BR")}
                  </div>
                  <span>{candidates.length-1} candidatos</span>
                  <>
                    {election.map(el => {
                      return <Candidate
                        key={el.id}
                        votes={el.votes}
                        candidate={candidates.filter((candidate => candidate.id === el.candidateId))}
                      />
                    })}
                  </>
                </div>
              </div>
          </main>
      </div>
  )
}
