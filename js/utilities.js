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

  static async fetchPokedexEntry(){
    await fetch();
  }

  static getCoordinate( distance, offset, is90_270 = false, flipX = false, flipY = false ){
    let coordinate = [0,0]
    if( is90_270 ){
      !flipY ?
        coordinate[1] = -distance :
        coordinate[1] = distance;
      console.log("VERT: Distance: %d --- X: %d Y: %d", distance, ...coordinate)
    } else {
      if( !flipX && !flipY ){
        coordinate = [-Utility.#getX(60,distance), -Utility.#getY(60,distance)];
        console.log("HORZ 030: Distance: %d --- X: %d Y: %d", distance, ...coordinate)
      } else if ( flipX && !flipY ){
        coordinate = [Utility.#getX(60,distance), -Utility.#getY(60,distance)];
        console.log("HORZ 150: Distance: %d --- X: %d Y: %d", distance, ...coordinate)
      } else if ( flipX && flipY ){
        coordinate = [Utility.#getX(60,distance), Utility.#getY(60,distance)];
        console.log("HORZ 210: Distance: %d --- X: %d Y: %d", distance, ...coordinate)
      } else if ( !flipX && flipY ){
        coordinate = [-Utility.#getX(60,distance), Utility.#getY(60,distance)];
        console.log("HORZ 270: Distance: %d --- X: %d Y: %d", distance, ...coordinate)
      }
    }
    coordinate[0] += 190;
    coordinate[1] += 190;
    return coordinate;
  }

  static #getX( angle, distance ){
    let radians = this.#getRadians(angle);
    return Math.round( Math.sin(radians) * distance );
  }

  static #getY( angle, distance ){
    let radians = this.#getRadians(angle);
    return Math.round( Math.cos(radians) * distance );
  }

  static #getRadians( angle ){
    return angle * (Math.PI / 180);
  }
}

/* --- Coordinate Testing ---

// Should return a coordinate array [x,y]
console.log( Utility.getCoordinate( 30, 180, [180,180]) )

// Should set the y coordinate to distance and x to 0 if the angle is 90 or 270 degrees
console.log( Utility.getCoordinate( 90, 180, [180,180]) )
console.log( Utility.getCoordinate( 270, 180, [180,180]) )
*/