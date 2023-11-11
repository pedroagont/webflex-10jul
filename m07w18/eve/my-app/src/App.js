import { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);
  const [starwarsData, setStarwarsData] = useState([]);
  const [rickandmortyData, setRickandmortyData] = useState([]);

  // const [state, setState] = useReducer(reducer, {
  //   loading: false,
  //   pokemonData: [],
  //   starwarsData: [],
  //   rickandmortyData: [],
  // });

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      Promise.all([
        fetch('https://pokeapi.co/api/v2/pokemon').then((res) => res.json()),
        fetch('https://swapi.dev/api/people').then((res) => res.json()),
        fetch('https://rickandmortyapi.com/api/character').then((res) =>
          res.json()
        ),
      ]).then((data) => {
        const [pokemon, starwars, rickandmorty] = data;

        setPokemonData(pokemon.results);
        setStarwarsData(starwars.results);
        setRickandmortyData(rickandmorty.results);
        setLoading(false);

        localStorage.setItem('visited', true);
      });
    }, 3000);
  }, []);

  useEffect(() => {
    const charactersLength =
      pokemonData.length + starwarsData.length + rickandmortyData.length;
    document.title = `${charactersLength} characters found!`;
  }, [pokemonData.length || starwarsData.length || rickandmortyData.length]);

  useEffect(() => {
    const visited = localStorage.getItem('visited');

    if (visited) {
      console.log('User has already visited this page!');
    }
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Hello from App! 👋</h1>
      <ul>
        {pokemonData.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>

      <ul>
        {starwarsData.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>

      <ul>
        {rickandmortyData.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
