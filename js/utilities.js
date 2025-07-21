class Utility{
  static readStorage(key){
    let data = localStorage.getItem(key)
    return JSON.parse(data);
  }

  static async fetchPokemon(key){
    await fetch(`https://pokeapi.co/api/v2/pokemon/${key}`)
      .then(response => response.json())
      .then((data) => {
        localStorage.setItem(key, JSON.stringify(data))
        localStorage.setItem(data.name, key);
      });
  }

  static async fetchAbility(ability){
    await fetch(`https://pokeapi.co/api/v2/ability/${ability}`)
      .then(response => response.json())
      .then((data) => {
        data.effect_entries[0].language.name == 'en' ?
          localStorage.setItem(ability, JSON.stringify(data.effect_entries[0])) :
          localStorage.setItem(ability, JSON.stringify(data.effect_entries[1]))
      });
  }
}