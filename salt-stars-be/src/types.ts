export type Character = {
  name: string;
  gender: string;
  birthYear: string;
  homeworld: string;
  id: number;
  planet?: string;
};

export type Planet = {
  climate: string;
  gravity: string;
  diameter: string;
  name: string;
  population: string;
  url: string;
};

export type CharacterFromSwapi = Character & {
  birth_year: string;
  url: string;
};
