import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);
  const [starwarsData, setStarwarsData] = useState([]);
  const [rickandmortyData, setRickandmortyData] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      Promise.all([
        fetch('https://pokeapi.co/api/v2/pokemon').then((res) => res.json()),
        fetch('https://swapi.dev/api/people').then((res) => res.json()),
        fetch('https://rickandmortyapi.com/api/character').then((res) =>
          res.json()
        ),
      ]).then(([pokemon, starwars, rickandmorty]) => {
        setPokemonData(pokemon.results);
        setStarwarsData(starwars.results);
        setRickandmortyData(rickandmorty.results);
        setLoading(false);

        localStorage.setItem('dataFetched', true);
      });
    }, 2000);
  }, []);

  useEffect(() => {
    document.title = `${pokemonData.length} characters found!`;
    return () => (document.title = 'React App');
  }, [pokemonData]);

  useEffect(() => {
    const dataFetched = localStorage.getItem('dataFetched');
    if (dataFetched) {
      console.log('User already visited page');
    }
  }, []);

  if (loading) {
    return <h1>Loading data...</h1>;
  }

  return (
    <div>
      <h1>Hello from App!</h1>
      <ul>
        {pokemonData.map((char) => (
          <li key={char.name}>{char.name}</li>
        ))}
      </ul>

      <ul>
        {starwarsData.map((char) => (
          <li key={char.name}>{char.name}</li>
        ))}
      </ul>

      <ul>
        {rickandmortyData.map((char) => (
          <li key={char.name}>{char.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
