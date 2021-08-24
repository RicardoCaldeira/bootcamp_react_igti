import Investiments from "./components/Investiments";
import { ALL_INVESTIMENTS } from "./data/investiments_data";

export default function App() {
  console.log('Teste no console do navegador');

  return (
    <div>
      <header>
        <div className="bg-gray-100 mx-auto p-4">
          <h1 className="text-center font-semibold text-xl">
            Projeto base para o Módulo React I
          </h1>
        </div>
      </header>

      <main>
        <div className="container mx-auto p-4">
          {ALL_INVESTIMENTS.investments.map(investiment => (
              <ul key={investiment.id} className="border p-2 mb-2"><Investiments id={investiment.id} description={investiment.description}></Investiments></ul>
          ))}
        </div>
      </main>
    </div>
  );
}
