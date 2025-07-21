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

  static set canvas(abilities){
    const canvas = document.querySelector('#stat-canvas');
    canvas.height = 380;
    canvas.width = 380;
    const context = canvas.getContext('2d');

    context.beginPath();
    context.lineTo(...Utility.getCoordinate(180,190, false, false, false))
    context.lineTo(...Utility.getCoordinate(180,190, true, true, false))
    context.lineTo(...Utility.getCoordinate(180,190, true, true, true))
    context.lineTo(...Utility.getCoordinate(180,190, false, false, true))
    context.lineTo(...Utility.getCoordinate(180,190, true, false, true))
    context.lineTo(...Utility.getCoordinate(180,190, true, false, false))
    // context.lineTo(...Utility.getCoordinate(30,180,170))
    // context.lineTo(...Utility.getCoordinate(90,180,170))
    // context.lineTo(...Utility.getCoordinate(150,180,170))
    // context.lineTo(...Utility.getCoordinate(210,180,170))
    // context.lineTo(...Utility.getCoordinate(270,180,170))
    // context.lineTo(...Utility.getCoordinate(330,180,170))
    context.closePath();
    //context.strokeStyle('black');
    context.stroke();
  }

  static updatePokeDex(pokemon){
    Pokedex.nameTag = pokemon.name;
    Pokedex.abilitiesTag = pokemon.abilities;
    Pokedex.spriteTag = pokemon.sprites;
    Pokedex.statTag = pokemon.stats;
    Pokedex.canvas = pokemon.abilities;
  }
}