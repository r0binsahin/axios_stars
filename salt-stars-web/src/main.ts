import {
  clearCharactersList,
  getCharacterDetails,
  getCharacters,
  renderCharactersList,
} from './star-wars';
import './style.css';
import { Character } from './types';

const state: {
  characters: Character[];
} = {
  characters: [],
};

export const showLoader = (loaderEl: HTMLElement | null) => {
  loaderEl?.removeAttribute('hidden');
};

export const hideLoader = (loaderEl: HTMLElement | null) => {
  loaderEl?.setAttribute('hidden', 'true');
};

const getCharactersFromApi = async () => {
  const loader = document.getElementById('loader');
  const charactersList = document.getElementById('charactersList');
  try {
    showLoader(loader);
    clearCharactersList(charactersList);
    const characters: Character[] = await getCharacters();

    state.characters = characters;

    renderCharactersList(characters, charactersList);
    hideLoader(loader);
  } catch (error) {
    console.error('Failed to fetch characters:', error);
    hideLoader(loader);
  }
};

export const initListeners = () => {
  document.getElementById('fetchData')?.addEventListener('click', async () => {
    getCharactersFromApi();
  });

  document.querySelector('#charactersList')?.addEventListener('click', (ev) => {
    let target = ev.target as HTMLLIElement;
    if (target.nodeName !== 'LI') {
      target = target.closest('li') as HTMLLIElement;
    }
    const codeEl = document.querySelector('#charDetails') as HTMLElement;
    codeEl.style.opacity = '0';
    const loader = document.getElementById('loader');
    showLoader(loader);
    const charId = target.getAttribute('data-char-id');
    const char = state.characters.find((ch) => charId === ch.id.toString());

    const character = getCharacterDetails(char!.id);
    codeEl.textContent = JSON.stringify(character, null, 2);
    hideLoader(loader);
    codeEl.style.opacity = '1';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const preEl = document.querySelector('#charDetails') as HTMLElement;
  preEl.style.opacity = '0';
  initListeners();
  getCharactersFromApi();
});
