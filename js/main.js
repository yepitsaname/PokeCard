class Pokemon {
  #key;
  constructor(id, key){
    this.id = id;
    this.#key = key;
    this.name = 'undefined';
    this.abilities = [];
    this.pokedexEntry = 'undefined';
    this.pokedexGeneration = 'undefined';
    this.stats = [];
    this.sprites = [];
    this.height = 0;
    this.weight = 0;
    this.types = [];
  }

  get key(){ return this.#key };

  updatePokemon(data){
    this.name = data.name;
    this.abilities = data.abilities.map(element => element.ability.name)
    this.height = data.height / 10; // converts from decimeters to meters
    this.weight = data.weight / 10; // converts from hectograms to kilograms
    this.stats = data.stats.map((element) => element.base_stat);
    this.sprites = [
      data.sprites.front_default, data.sprites.front_female,
      data.sprites.front_shiny, data.sprites.front_shiny_female
    ];
    this.types = data.types.map(element => element.type)
  }

  startDataRetrieval(){
    if(this.id > 0 && this.id < 1025 ){
      if(Utility.readStorage(this.id) == null || Utility.readStorage(this.id) == 'false' ){
        localStorage.setItem(this.id, false);
        Utility.fetchPokemon(this.id);
      };

      var loaded = setInterval(()=>{
        if(Utility.readStorage(this.id) != null || Utility.readStorage(this.id) !='false' ){
          this.updatePokemon(Utility.readStorage(this.id));
          Utility.fetchAbility(this.abilities[0]);
          Utility.fetchAbility(this.abilities[1]);
          if(this.id === this.key){ Pokedex.updatePokeDex(this) }
          clearInterval(loaded);
        }
      }, 100);
    };
  }

}

// Check pokemon key
const params = new URLSearchParams(window.location.search)
let pokemon_key = Number(params.get('pokemon'));
pokemon_key <= 0 || pokemon_key >= 1025 ? pokemon_key = 1 : false;

const previousPokemon = new Pokemon(pokemon_key - 1, pokemon_key);
const mainPokemon = new Pokemon(pokemon_key, pokemon_key);
const nextPokemon = new Pokemon(pokemon_key + 1, pokemon_key);

window.onload = ()=>{
  // Set fetch state & pokemon by key
  previousPokemon.startDataRetrieval();
  mainPokemon.startDataRetrieval();
  nextPokemon.startDataRetrieval();
}

