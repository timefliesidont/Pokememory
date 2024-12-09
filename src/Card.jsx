export default function Card({ name, image, status, setScore, setBestScore, setPokemons, score, shuffleArray }) {
  
  function handleClick() {
    function updatePokemons(array) {
      let i = array.findIndex(element => element.name === name);
      let a = [...array]
      a[i] = {name, image, chosen:true}
      return a;
    }
    if(status == false){
      setScore(s => s + 1);
      setPokemons(poke => shuffleArray(updatePokemons(poke)));
    }
    else {
      setBestScore(bs => Math.max(score, bs));
      setScore(0);
      setPokemons(poke => shuffleArray(poke.map(p => ({name:p.name,image:p.image,chosen : false}))));
    }
  }

return (
    <div className="p-4 text-center border border-white cursor-pointer hover:-translate-x-px hover:-translate-y-px hover:border-teal-100 hover:text-teal-100 transition-transform " onClick={handleClick}>
      <img src={image} alt={name} className="h-32 mx-auto" />
      <p> {name} </p>
    </div>
  );
}
