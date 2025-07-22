// Check pokemon key
const params = new URLSearchParams(window.location.search)
let pokemon_key = Number(params.get('pokemon'));
pokemon_key <= 0 || pokemon_key >= 1025 ? pokemon_key = 1 : false;

const previousPokemon = new Pokemon(pokemon_key - 1, pokemon_key);
const mainPokemon = new Pokemon(pokemon_key, pokemon_key);
const nextPokemon = new Pokemon(pokemon_key + 1, pokemon_key);

function goToPokemon(URLParam){
  URLParam <= 0 ? URLParam = 1 : false;
  URLParam => 1025 ? URLParam = 1024 : false;
  console.log(window.location.pathname + `?pokemon=${URLParam}`)
  window.location.href = (`./pokedex.html?pokemon=${URLParam}`);
}

window.onload = ()=>{
  // Set fetch state & pokemon by key
  previousPokemon.startDataRetrieval();
  mainPokemon.startDataRetrieval();
  nextPokemon.startDataRetrieval();

  document.querySelector('.previous-pokemon').addEventListener("click", ()=> { goToPokemon(pokemon_key - 1); console.log('<') })
  document.querySelector('.next-pokemon').addEventListener("click", ()=>{ goToPokemon(pokemon_key + 1), console.log('>') })
  const search = document.querySelector('#poke-search')
  search.addEventListener("keyup", (event)=>{
    if((event.key === 'Enter' || event.keyCode === 13) && search.value != ''){
      if( Utility.readStorage(search.value) == null ){
        Utility.fetchPokemon(search.value)
          .then(()=>{
            goToPokemon(Utility.readStorage(search.value))
          })
          .catch(error => {
            return error;
          });
      } else {
        goToPokemon(Utility.readStorage(search.value));
      };
    }
  })
}