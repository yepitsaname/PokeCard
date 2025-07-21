class Pokedex{

  static set nameTag(name){
    document.querySelector('.pokemon-name').innerHTML = name.toUpperCase();
  }

  static set abilitiesTag(abilities){
    let ability_1 = document.querySelector('.ability-one');
    ability_1.querySelector('h4').innerHTML = abilities[0].toUpperCase();
    ability_1.querySelector('p').innerText = Utility.readStorage(abilities[0]).effect;

    let ability_2 = document.querySelector('.ability-two');
    ability_2.querySelector('h4').innerHTML = abilities[1].toUpperCase();
    ability_2.querySelector('p').innerText = Utility.readStorage(abilities[1]).effect;
  }

  static set spriteTag(sprites){
    document.querySelector('.pokemon-image.front').src = sprites[0];
    document.querySelector('.pokemon-image.front.female').src = sprites[1];
    document.querySelector('.pokemon-image.front.shiny').src = sprites[2];
    document.querySelector('.pokemon-image.front.shiny.female').src = sprites[3];
  }

  static set statTag(stats){
    let stat_textTags = document.querySelectorAll('.stat-middle p');
    stat_textTags.forEach((tag, index) => tag.innerText = stats[index])

    let stat_divTags = document.querySelectorAll('.stat-right div');
    stat_divTags.forEach((tag, index) => tag.style.width = `${stats[index]/255 * 90}%`)
  }

  static updatePokeDex(pokemon){
    Pokedex.nameTag = pokemon.name;
    Pokedex.abilitiesTag = pokemon.abilities;
    Pokedex.spriteTag = pokemon.sprites;
    Pokedex.statTag = pokemon.stats;
  }
}