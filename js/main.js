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

  set nameTag(name){
    document.querySelector('.pokemon-name').innerHTML = name.toUpperCase();
  }

  set abilitiesTag(abilities){
    let ability_1 = document.querySelector('.ability-one');
    ability_1.querySelector('h4').innerHTML = abilities[0].toUpperCase();

    let ability_2 = document.querySelector('.ability-two');
    ability_2.querySelector('h4').innerHTML = abilities[1].toUpperCase();
  }

  set spriteTag(sprites){
    document.querySelector('.pokemon-image.front').src = sprites[0];
    document.querySelector('.pokemon-image.front.female').src = sprites[1];
    document.querySelector('.pokemon-image.front.shiny').src = sprites[2];
    document.querySelector('.pokemon-image.front.shiny.female').src = sprites[3];
  }

  set statTag(stats){
    let stat_textTags = document.querySelectorAll('.stat-middle p');
    stat_textTags.forEach((tag, index) => tag.innerText = stats[index])

    let stat_divTags = document.querySelectorAll('.stat-right div');
    stat_divTags.forEach((tag, index) => tag.style.width = `${stats[index]/255 * 90}%`)
  }

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
      if(localStorage.getItem(this.id) == null ){
        localStorage.setItem(this.id, false);
        Pokemon.fetchPokemon(this.id);
      };

      var loaded = setInterval(()=>{
        if(Pokemon.readStorage(this.id)){
          this.updatePokemon(Pokemon.readStorage(this.id));
          if(this.id === this.key){ Pokemon.updatePokeDex(this) }
          clearInterval(loaded);
        }
      }, 100);

    };
  }

  static async fetchPokemon(key){
    await fetch(`https://pokeapi.co/api/v2/pokemon/${key}`)
      .then(response => response.json())
      .then((data) => {
        localStorage.setItem(key, JSON.stringify(data))
        localStorage.setItem(data.name, key);
      });
  }

  static readStorage(key){
    let data = localStorage.getItem(key)
    return JSON.parse(data);
  }

  static updatePokeDex(pokemon){
    pokemon.nameTag = pokemon.name;
    pokemon.abilitiesTag = pokemon.abilities;
    pokemon.spriteTag = pokemon.sprites;
    pokemon.statTag = pokemon.stats;
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