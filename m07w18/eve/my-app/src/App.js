import { useEffect, useState } from 'react';

import './App.css';

function App() {
  // Mutiple state variables
  // const [loading, setLoading] = useState(false);
  // const [pokemonData, setPokemonData] = useState([]);
  // const [starwarsData, setStarwarsData] = useState([]);
  // const [rickandmortyData, setRickandmortyData] = useState([]);

  // Single state variable with all properties within an object
  const [state, setState] = useState({
    loading: false,
    pokemonData: [],
    starwarsData: [],
    rickandmortyData: [],
  });

  useEffect(() => {
    // setLoading(true);
    setState((prev) => ({ ...prev, loading: true }));

    setTimeout(() => {
      Promise.all([
        fetch('https://pokeapi.co/api/v2/pokemon').then((res) => res.json()),
        fetch('https://swapi.dev/api/people').then((res) => res.json()),
        fetch('https://rickandmortyapi.com/api/character').then((res) =>
          res.json()
        ),
      ]).then((data) => {
        const [pokemon, starwars, rickandmorty] = data;

        // setPokemonData(pokemon.results);
        // setStarwarsData(starwars.results);
        // setRickandmortyData(rickandmorty.results);
        // setLoading(false);

        setState((prev) => ({
          ...prev,
          pokemonData: pokemon.results,
          starwarsData: starwars.results,
          rickandmortyData: rickandmorty.results,
          loading: false,
        }));

        localStorage.setItem('visited', true);
      });
    }, 3000);
  }, []);

  useEffect(() => {
    const charactersLength =
      state.pokemonData.length +
      state.starwarsData.length +
      state.rickandmortyData.length;
    document.title = `${charactersLength} characters found!`;
  }, [
    state.pokemonData.length,
    state.starwarsData.length,
    state.rickandmortyData.length,
  ]);

  useEffect(() => {
    const visited = localStorage.getItem('visited');

    if (visited) {
      console.log('User has already visited this page!');
    }
  }, []);

  if (state.loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Hello from App! 👋</h1>
      <div style={{ display: 'flex' }}>
        <ul>
          <h4>Pokemon</h4>
          {state.pokemonData.map((item) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </ul>

        <ul>
          <h4>Star Wars</h4>
          {state.starwarsData.map((item) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </ul>

        <ul>
          <h4>Rick And Morty</h4>
          {state.rickandmortyData.map((item) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
