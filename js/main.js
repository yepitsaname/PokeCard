class Pokemon {
  #key;
  constructor(id){
    this.id = id;
    this.#key = id;
    this.name = 'undefined';
    this.ability_1 = 'undefined';
    this.ability_2 = 'undefined';
    this.pokedexEntry = 'undefined';
    this.pokedexGeneration = 'undefined';
    this.stats = [0,0,0,0,0,0];
    this.images = [];
  }

  get key(){ return this.#key }

  static async fetchPokemon(pokemon){
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.key}`)
      .then(response => response.json())
      .then((data) => { localStorage.setItem(pokemon.key, JSON.stringify(data)) });
  }

  static readStorage(key){
    let data = localStorage.getItem(key)
    return JSON.parse(data);
  }
}

// Check pokemon key
const params = new URLSearchParams(window.location.search)
pokemon_key = Number(params.get('pokemon'));

window.onload = ()=>{

  // Set fetch state & pokemon by key
  if( pokemon_key - 1 > 0 && pokemon_key - 1 < 1025 ){
    var previousPokemon = new Pokemon(pokemon_key - 1);
    if( localStorage.getItem(previousPokemon.key) == null ){
      localStorage.setItem(previousPokemon.key, false);
      Pokemon.fetchPokemon(previousPokemon);
    } else {
      Pokemon.readStorage(previousPokemon.key);
    };
  };

  if( pokemon_key > 0 && pokemon_key < 1025 ){
    var mainPokemon = new Pokemon(pokemon_key)
    if( localStorage.getItem(mainPokemon.key) == null ){
      localStorage.setItem(mainPokemon.key, false);
      Pokemon.fetchPokemon(mainPokemon);
    } else {
      Pokemon.readStorage(mainPokemon.key);
    };
  };

  if( pokemon_key + 1 > 0 && pokemon_key + 1 < 1025 ){
    var nextPokemon = new Pokemon(pokemon_key + 1)
    if( localStorage.getItem(nextPokemon.key) == null ){
      localStorage.setItem(pokemon_key + 1, false);
      Pokemon.fetchPokemon(nextPokemon);
    } else {
      Pokemon.readStorage(nextPokemon.key);
    }
  };

  // Cache pokemon

  // Start an interval to check fetch states

  // Load data once Fetching is complete

  // Show data (hide loading screen/unhide content)
}