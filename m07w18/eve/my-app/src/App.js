import { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [charactersData, setCharactersData] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch('https://pokeapi.co/api/v2/pokemon')
        .then((res) => res.json())
        .then((data) => {
          setCharactersData(data.results);
          setLoading(false);
        });
    }, 3000);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Hello from App! 👋</h1>
      <ul>
        {charactersData.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
