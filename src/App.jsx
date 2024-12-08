
import { useState, useEffect } from "react";

function Card({ name, image }) {
  return (
    <div className="p-4 text-center border border-white">
      <img src={image} alt={name} className="h-32 mx-auto" />
      <p> {name} </p>
    </div>
  );
}

export default function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const responses = await Promise.all(
          Array.from({ length: 20 }, (_, i) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then((res) =>
              res.json()
            )
          )
        );
        const fetchedPokemons = responses.map((json) => ({
          name: json.name,
          image: json.sprites.front_default,
        }));
        setPokemons(fetchedPokemons); 
      } catch (err) {
        console.log(err);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="bg-zinc-900 text-zinc-300 min-h-screen p-8">
      <h1 className="font-semibold text-4xl">Samay's Memory Game</h1>
      <h2 className="font-medium text-xl">
        Get points by clicking on an image but don't click on any more than
        once!
      </h2>
      <div className="p-4 flex flex-col items-center">
        <p> Score: {score} </p>
        <p> Best Score : {bestScore} </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.name} name={pokemon.name} image={pokemon.image} />
        ))}
      </div>
    </div>
  );
}

