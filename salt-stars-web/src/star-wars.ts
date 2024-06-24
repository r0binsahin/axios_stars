import { Character, CharacterWithPlanet } from './types';

import axios from 'axios';

export const getCharacters = async () => {
  const response = await axios.get(
    'http://localhost:3000/api/v1/star-wars/characters'
  );

  const characters = response.data.characters as Character[];
  console.log('my char with palner', characters);
  return characters;
};

export const getCharacterDetails = async (charId: number) => {
  const response = await axios.get(
    `http://localhost:3000/api/v1/star-wars/characters/${charId}`
  );

  const characters = response.data as CharacterWithPlanet;

  return characters;
};

export const renderCharactersList = (
  characters: Character[],
  charactersList: HTMLElement | null
) => {
  if (!charactersList) {
    return;
  }

  const template = document.getElementById(
    'characterTemplate'
  ) as HTMLTemplateElement;

  characters.forEach((character: Character) => {
    const listItem = document.importNode(template.content, true)
      .firstElementChild as HTMLElement;

    listItem.setAttribute('data-char-id', character.id.toString());

    const nameEl = listItem.querySelector(
      '.character-item__name'
    ) as HTMLHeadingElement;

    nameEl.textContent = character.name;

    const genderEl = listItem.querySelector(
      '.character-item__gender'
    ) as HTMLParagraphElement;

    genderEl.textContent = character.gender;
    const birthYearEl = listItem.querySelector(
      '.character-item__birth-year'
    ) as HTMLParagraphElement;

    birthYearEl.textContent = character.birthYear;
    charactersList.appendChild(listItem);
  });
};

export const clearCharactersList = (charactersList: HTMLElement | null) => {
  if (!charactersList) {
    return;
  }
  charactersList.innerHTML = '';
};
