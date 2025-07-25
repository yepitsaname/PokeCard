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
    this.pokedexEntry = data.name + '-pokedex'
  }

  startDataRetrieval(){
    if(this.id > 0 && this.id < 1025 ){
      if(Utility.readStorage(this.id) == null || Utility.readStorage(this.id) == 'false' ){
        localStorage.setItem(this.id, false);
        Utility.fetchPokemon(this.id);
      };

      let loading = setInterval(()=>{
        if(Utility.readStorage(this.id) != null || Utility.readStorage(this.id) !='false' ){
          this.updatePokemon(Utility.readStorage(this.id));

          this.abilities.forEach( ability => {
            if(Utility.readStorage(ability) == null){ Utility.fetchAbility(ability) };
          });

          if(Utility.readStorage(this.name + '-pokedex') == null){
            Utility.fetchPokedexEntry(this.name)
          };
          clearInterval(loading);
        }
      }, 100);

      let loaded = setInterval(()=>{
        if(Utility.readStorage(this.name + '-pokedex') != null){
          let abilities_state = [];

          this.abilities.forEach(ability => {
            Utility.readStorage != null ? abilities_state.push(true) : abilities_state.push(false)
          })

          if( abilities_state.reduce((all_states, state) => all_states = all_states && state )){
            this.updatePokemon(Utility.readStorage(this.id));
            if(this.id === this.key){ Pokedex.updatePokeDex(this) }
            if(this.id === this.key - 1){ document.querySelector(".previous-pokemon .page-img").src = this.sprites[0] }
            if(this.id === this.key + 1){ document.querySelector(".next-pokemon .page-img").src = this.sprites[0] }
            clearInterval(loaded);
          }
        }
      },100)
    };
  }

}