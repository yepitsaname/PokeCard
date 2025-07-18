# PokeCard Webpage
This webpage is designed to show an end user the PokeDex data for any pokemon using Generation III stats and beyond. It will not show their move pool or learnsets.

## Basic Design
![Poke Dex Page Design](./designs/PokeDex%20Design.png)

## Functions of the Page
1. Allows users to cycle through the PokeDex
2. Allows users to search for a specific pokemon
3. Handles a pokemon not found exception
4. Defaults to the first PokeDex entry if no key is provided
5. Seperates pages using a pokemon_id?=key pair
6. Caches pokedata in the storage to prevent repeat calls

## Basic Page Interaction
1. Search bar to go to a specific pokemon
2. Left and right buttons to cycle through pokemon
3. PokeDex Entry left and right buttons to cycle through different game pokedex entries
4. Allow users to toggle between male/female sprites
5. Allow users to toggle shiny/normal sprites

## Base Display / Data Manipulation
1. Should fetch a pokemon from the PokeApi
2. Should display the front image non-shiny male/neutral image by default
3. Should display the pokemon's name
4. Should display their abilities
5. Should display the earliest generation pokedex entry and what gen/game it is from
6. Should display a pokemon's base stats as a graph
7. Should display a pokemon's base stats as labeled values
8. Should display the image of the previous pokemon or next pokemon by the outer left/right buttons
9. Should not display any image and grey out left/right buttons if there is no more pokemon

