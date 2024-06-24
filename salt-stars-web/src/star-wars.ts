import { Character, CharacterWithPlanet } from "./types";

export const getCharacters = (): Promise<Character[]> => {
  const data = fetch("http://localhost:3000/api/v1/star-wars/characters")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const { characters } = json as { characters: Character[] };
      return characters;
    });
  return data;
};

//console.log(getCharacters());
//getCharacters().then((data) => console.log(data, "from .then on function"));

export const getCharacterDetails = (charId: number) => {
  fetch(`http://localhost:3000/api/v1/star-wars/characters/${charId}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const { character } = json as { character: CharacterWithPlanet };
      return character;
    });
};

export const renderCharactersList = (
  characters: Character[],
  charactersList: HTMLElement | null
) => {
  if (!charactersList) {
    return;
  }

  const template = document.getElementById(
    "characterTemplate"
  ) as HTMLTemplateElement;

  characters.forEach((character) => {
    const listItem = document.importNode(template.content, true)
      .firstElementChild as HTMLElement;

    //listItem.setAttribute("data-char-id", character.id.toString());

    const nameEl = listItem.querySelector(
      ".character-item__name"
    ) as HTMLHeadingElement;

    nameEl.textContent = character.name;

    const genderEl = listItem.querySelector(
      ".character-item__gender"
    ) as HTMLParagraphElement;

    genderEl.textContent = character.gender;
    const birthYearEl = listItem.querySelector(
      ".character-item__birth-year"
    ) as HTMLParagraphElement;

    birthYearEl.textContent = character.birthYear;
    charactersList.appendChild(listItem);
  });
};

export const clearCharactersList = (charactersList: HTMLElement | null) => {
  if (!charactersList) {
    return;
  }
  charactersList.innerHTML = "";
};
