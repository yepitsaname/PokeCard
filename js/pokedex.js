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

  static set canvas(stats){
    const canvas = document.querySelector('#stat-canvas');
    const context = canvas.getContext('2d');
    context.canvas.height = 380;
    context.canvas.width = 380;


    const drawHexChart = (distances, color = 'black', fill = false, fillColor = 'black')=>{
      context.beginPath();
      context.lineTo(...Utility.getCoordinate(distances[0],190, true, false, false))
      context.lineTo(...Utility.getCoordinate(distances[1],190, false, true, false))
      context.lineTo(...Utility.getCoordinate(distances[2],190, false, true, true))
      context.lineTo(...Utility.getCoordinate(distances[3],190, true, false, true))
      context.lineTo(...Utility.getCoordinate(distances[4],190, false, false, true))
      context.lineTo(...Utility.getCoordinate(distances[5],190, false, false, false))
      context.closePath();
      context.strokeStyle = color;
      if( fill ){

      }
      context.stroke();
    }
    // Draw Inner Stat Diagram
    let distances = stats.map(elem => elem = elem / 255 * 180)
    drawHexChart(distances, 'red');

    // Draw Outer Graph
    drawHexChart([180,180,180,180,180,180]);

    // Draw 75 Graph
    drawHexChart([135,135,135,135,135,135]);

    // Draw 50 run Graph
    drawHexChart([90,90,90,90,90,90]);

    // Draw 25 run Graph
    drawHexChart([45,45,45,45,45,45]);

    // Draw 10 run Graph
    drawHexChart([18,18,18,18,18,18]);
  }

  static updatePokeDex(pokemon){
    Pokedex.nameTag = pokemon.name;
    Pokedex.abilitiesTag = pokemon.abilities;
    Pokedex.spriteTag = pokemon.sprites;
    Pokedex.statTag = pokemon.stats;
    Pokedex.canvas = pokemon.stats;
  }
}