import { useEffect, useState } from "react";
import CandidateCard from "../components/CandidateCard";
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
          cities.forEach(c => {
            if(c.id === selectedCityId) {
              setCity(c);
            }
          });

          setAllElections(await apiGetAllElections());
          const electionAux = allElections.filter((election) => {return election.cityId === selectedCityId})
          setElection(electionAux.sort((a, b) => a-b));

          setAllCandidates (await apiGetAllCandidates());
          let candidatesAux = [];
          election.forEach(e => {
            allCandidates.forEach(c => {
              if(e.candidateId === c.id) {
                candidatesAux.push(c);
              }
            });
          });
          setCandidates(candidatesAux);

          //debugger;
          console.log(cities);
          console.log(city);
          console.log(election);
          console.log(candidates);

        } catch (error) {
          // setError(error.message);
        }
      }
      getData();

  }, []);

  function handleCitySelect(selectedCity) {
    //console.log(selectedCity);
  }

  function getCandidate(e) {
    candidates.forEach(candidate => {
      if(candidate.id === e.candidateId) {
        debugger;
        return candidate;
      }
    })
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
                  <h2 className="font-bold">{`Eleição em ${city.name}`}</h2>
                  <div className="flex flex-row space-x-2 justify-center m-2">
                    <span className="font-semibold">{`Total de eleitores: `}</span>{city.votingPopulation.toLocaleString("pt-BR")}
                    <span className="font-semibold">{`Abstenção: `}</span>{city.absence.toLocaleString("pt-BR")}
                    <span className="font-semibold">{`Abstenção: `}</span>{city.presence.toLocaleString("pt-BR")}
                  </div>
                  <span>{candidates.length-1} candidatos</span>
                  <div className={"shadow-lg p-4 m-2 w-80 h-48 flex flex-row"}>
                    {election.map(e => {
                      return <CandidateCard
                        key={e.id}
                        votes={e.votes}
                        candidate={getCandidate(e)}
                      />
                    })}
                  </div>
                </div>
              </div>
          </main>
      </div>
  )
}
