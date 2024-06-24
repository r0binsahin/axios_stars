export type Character = {
  name: string;
  gender: string;
  birthYear: string;
  homeworld: string;
  id: number;
}

export type Planet = {
  climate: string;
  gravity: string;
  diameter: string;
  name: string;
  population: string;
}

export type CharacterWithPlanet = Character & {planet: Planet};