import { useState, useEffect } from "react";
import Card from './Card.jsx';

function shuffleArray(arr) {
  let array = [...arr];
  let currentIndex= array.length;

  while(currentIndex != 0){
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];

  }
  return array;
}

export default function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const responses = await Promise.all(
          Array.from({ length: 15 }, (_, i) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then((res) =>
              res.json()
            )
          )
        );
        const fetchedPokemons = responses.map((json) => ({
          name: json.name,
          image: json.sprites.front_default,
          chosen: false,
        }));
        setPokemons(shuffleArray(fetchedPokemons)); 
      } catch (err) {
        console.log(err);
      }
    };

    fetchPokemons();
    
  }, []);

  


  return (
    <div className="bg-zinc-900 text-zinc-300 min-h-screen p-8">
      <h1 className="font-semibold text-4xl text-teal-100">Pokememory</h1>
      <h2 className="font-medium ">
        Get points by clicking on a Pokemon but don't click on any more than
        once!
      </h2>
      <div className="p-4 text-lg flex flex-col items-center text-teal-100">
        <p > Score: {score} </p>
        <p> Best Score : <span className="text-emerald-400"> {bestScore} </span> </p>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.name} name={pokemon.name} image={pokemon.image} status={pokemon.chosen} setScore={setScore} setBestScore={setBestScore} setPokemons={setPokemons} score={score} shuffleArray={shuffleArray}/>
        ))}
      </div>

      <footer className="mt-12">
        <p> Developed by <a className="text-teal-100" target="_blank" href="https://github.com/timefliesidont"> Samay </a> </p>
      </footer>
    </div>
  );
}

