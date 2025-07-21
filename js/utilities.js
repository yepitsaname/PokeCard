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

  static getCoordinate( distance, offset, is30 = false, flipX = false, flipY = false ){
    const coordinate = [Utility.#getX(30,distance), Utility.#getY(30,distance)];
    if( !is30 ){
      if( flipY ){
        coordinate[0] = offset;
        coordinate[1] = offset + distance;
      } else {
        coordinate[0] = offset;
        coordinate[1] = offset - distance;
      }
    } else {
      if( flipX ){
        coordinate[0] += offset * 1.4;
      } else {
        coordinate[0] -= offset * 0.35;
      }
      if( flipY ){
        coordinate[1] += offset * 0.7;
      } else {
        coordinate[1] -= offset * 0.35;
      }
    }
    console.log("X: %d Y: %d", ...coordinate)
    return coordinate;
  }

  // static getCoordinate( angle, distance, offset ){
  //   const coordinate = [190,180];
  //   if( angle == 90 || angle == 270 ){
  //     angle == 90 ? coordinate[1] = distance - offset * 0.9 : false;
  //     angle == 270 ? coordinate[1] = distance + offset * 1 : false;
  //   } else {
  //     coordinate[0] = Utility.#getX(angle,distance);
  //     coordinate[1] = Utility.#getY(angle,distance);

  //     // angle > 90 && angle < 180 ? coordinate[1] =- coordinate[1] : false;
  //     angle > 0 && angle < 180 ? coordinate[1] -= offset * 0.3 : false;
  //     angle > 180 && angle < 360 ? coordinate[1] += offset * 0.65 : false;
  //     angle > 90 && angle < 270 ? coordinate[0] += offset * 1.5 : false;
  //     angle < 90 || angle > 270 ? coordinate[0] -= offset * 0.35 : false;
  //     // angle >  && angle
  //   }
  //   console.log("X: %d Y: %d", ...coordinate)
  //   return coordinate;
  // }

  /*
    The real problem, only need to calc 30 degrees. Invert x,y as needed
  */

  // -adjacent is x for angles < 90 => angle % 180 <= 90 ?
  // +adjacent is x for angle > 90

  // -opposite is y for angles < 180
  // +opposite is y for angles > 180


  static #getX( angle, distance ){
    let radians = this.#getRadians(angle);
    return Math.abs(Math.round( Math.sin(radians) * distance ));
  }

  static #getY( angle, distance ){
    let radians = this.#getRadians(angle);
    return Math.abs(Math.round( Math.cos(radians) * distance ));
  }

  static #getRadians( angle ){
    return angle * Math.PI / 180;
  }
}

/* --- Coordinate Testing ---

// Should return a coordinate array [x,y]
console.log( Utility.getCoordinate( 30, 180, [180,180]) )

// Should set the y coordinate to distance and x to 0 if the angle is 90 or 270 degrees
console.log( Utility.getCoordinate( 90, 180, [180,180]) )
console.log( Utility.getCoordinate( 270, 180, [180,180]) )
*/