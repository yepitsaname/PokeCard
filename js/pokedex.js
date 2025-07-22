class Pokedex{

  static set nameTag(name){
    document.querySelector('.pokemon-name').innerHTML = name.toUpperCase();
  }

  static set abilitiesTag(abilities){
    let htmlTag = document.querySelector(".abilities");
    htmlTag.innerHTML = '';

    abilities.forEach(ability=> {
      htmlTag.innerHTML += `<div><h4>${ability.toUpperCase()}</h4><p>${Utility.readStorage(ability).effect}</p></div>`
    })
  }

  static set pokedexEntryTag(entry){
    let entries = Utility.readStorage(entry).flavor_text_entries;

    let entry_data = ((array) => {
      let english = new RegExp(/^(?!\s$)[A-Za-zÉé0-9\/ ,-.×]+$/gm);
      for( let entry of entries ){
        if( entry.language.name ='en' && english.test(entry.flavor_text) ){
          return entry;
        };
      };
    })(entries)

    document.querySelector('.poke-entry p').innerText = entry_data.flavor_text.replace(RegExp(/[\n\f]/g), ' ');
    document.querySelector('.gen').innerText = " - " + entry_data.version.name.toUpperCase();
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
    // Convert into a utility method for future use.
    const canvas = document.querySelector('#stat-canvas');
    const context = canvas.getContext('2d');
    context.canvas.height = 380;
    context.canvas.width = 380;

    const drawHexChart = (distances, color = 'grey', fill = false)=>{
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
        context.fillStyle = '#69dc12'
        context.fill();
      }
      context.stroke();
    }

    const drawChartLines = (distances)=>{
      context.beginPath();
      context.moveTo(190,190)
      context.lineTo(...Utility.getCoordinate(distances[0],190, true, false, false))
      context.moveTo(190,190)
      context.lineTo(...Utility.getCoordinate(distances[1],190, false, true, false))
      context.moveTo(190,190)
      context.lineTo(...Utility.getCoordinate(distances[2],190, false, true, true))
      context.moveTo(190,190)
      context.lineTo(...Utility.getCoordinate(distances[3],190, true, false, true))
      context.moveTo(190,190)
      context.lineTo(...Utility.getCoordinate(distances[4],190, false, false, true))
      context.moveTo(190,190)
      context.lineTo(...Utility.getCoordinate(distances[5],190, false, false, false))
      context.stroke();
    }

    // Draw Inner Stat Diagram
    let distances = stats.map(elem => elem = elem / 255 * 180)
    drawHexChart(distances, 'black', true);
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
    drawChartLines([180,180,180,180,180,180])
  }

  static updatePokeDex(pokemon){
    Pokedex.nameTag = pokemon.name;
    Pokedex.abilitiesTag = pokemon.abilities;
    Pokedex.spriteTag = pokemon.sprites;
    Pokedex.statTag = pokemon.stats;
    Pokedex.canvas = pokemon.stats;
    Pokedex.pokedexEntryTag = pokemon.pokedexEntry
  }
}