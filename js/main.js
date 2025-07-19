class Pokemon {
  #key;
  constructor(id){
    this.id = id;
    this.#key = id;
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

  get key(){ return this.#key }

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

  static async fetchPokemon(key){
    await fetch(`https://pokeapi.co/api/v2/pokemon/${key}`)
      .then(response => response.json())
      .then((data) => {
        localStorage.setItem(key, JSON.stringify(data))
        localStorage.setItem(data.name, key);
        return data;
      });
  }

  static async readStorage(key){
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
console.log(pokemon_key)

window.onload = ()=>{

  // Set fetch state & pokemon by key
  if( pokemon_key - 1 > 0 && pokemon_key - 1 < 1025 ){
    var previousPokemon = new Pokemon(pokemon_key - 1);
    if( localStorage.getItem(previousPokemon.key) == null ){
      localStorage.setItem(previousPokemon.key, false);
      Pokemon.fetchPokemon(previousPokemon.key);
    } else {
      Pokemon.readStorage(previousPokemon.key);
    };
  };

  if( pokemon_key > 0 && pokemon_key < 1025 ){
    var mainPokemon = new Pokemon(pokemon_key)
    if( localStorage.getItem(mainPokemon.key) == null ){
      localStorage.setItem(mainPokemon.key, false);
      Pokemon.fetchPokemon(mainPokemon.key)
        .then((data)=> mainPokemon.updatePokemon(data))
        .then(()=>Pokemon.updatePokeDex(mainPokemon))
    } else {
      Pokemon.readStorage(mainPokemon.key)
        .then((data)=> mainPokemon.updatePokemon(data))
        .then(()=>Pokemon.updatePokeDex(mainPokemon))
    };
  };

  if( pokemon_key + 1 > 0 && pokemon_key + 1 < 1025 ){
    var nextPokemon = new Pokemon(pokemon_key + 1)
    if( localStorage.getItem(nextPokemon.key) == null ){
      localStorage.setItem(pokemon_key + 1, false);
      Pokemon.fetchPokemon(nextPokemon.key);
    } else {
      Pokemon.readStorage(nextPokemon.key);
    }
  };
}