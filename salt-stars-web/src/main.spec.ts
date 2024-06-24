import { fireEvent, getAllByTestId, getByTestId } from '@testing-library/dom'
import * as mainMethods from './main'
import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as starWarsMethods from './star-wars';
import { mockSwapiResp } from '../test/__mocks__/mockSwapiResp';

const html = readFileSync(resolve(__dirname, '../index.html'), 'utf8');

describe('App', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ characters: mockSwapiResp.characters }),
      }),
    ) as jest.Mock;
    document.body.innerHTML = html
  })

  afterEach(() => {
    jest.restoreAllMocks();
  })

  it('Should have fetchData button', () => {
    expect(getByTestId(document.body, 'fetchData')).toBeVisible();
  });

  it('Should have show and hide loader', (done) => {
    jest.spyOn(mainMethods, 'showLoader');
    jest.spyOn(mainMethods, 'hideLoader');
    jest.spyOn(starWarsMethods, 'renderCharactersList');
    mainMethods.initListeners();
    fireEvent(
      getByTestId(document.body, 'fetchData'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
    expect(mainMethods.showLoader).toHaveBeenCalled();
    // forcing next tick here
    setTimeout(() => {
      expect(starWarsMethods.renderCharactersList).toHaveBeenCalled();
      expect(mainMethods.hideLoader).toHaveBeenCalled();
      done();
    }, 0)
  });

  it('Should have render the list and show/hide loader appropriately', (done) => {
    mainMethods.initListeners();
    fireEvent(
      getByTestId(document.body, 'fetchData'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
    const loader = getByTestId(document.body, 'loader');
    expect(loader).toBeVisible();
    // forcing next tick here
    setTimeout(() => {
      const characterItems = getAllByTestId(document.body, 'characterItem');
      expect(characterItems.length).toBe(4);
      expect(loader).not.toBeVisible();
      done();
    }, 300)
  });

  it('Should show the character data appropriately', (done) => {
    mainMethods.initListeners();
    fireEvent(
      getByTestId(document.body, 'fetchData'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    )
    // forcing next tick here
    setTimeout(() => {
      const characterItems = getAllByTestId(document.body, 'characterItem');
      const firstCharacter = characterItems[0];
      const nameEl = firstCharacter.querySelector('.character-item__name') as HTMLHeadingElement;
      expect(nameEl.textContent).toBe('Beru Whitesun lars');
      const genderEl = firstCharacter.querySelector('.character-item__gender') as HTMLParagraphElement;
      expect(genderEl.textContent).toBe('female');
      const birthYearEl = firstCharacter.querySelector('.character-item__birth-year') as HTMLParagraphElement;
      expect(birthYearEl.textContent).toBe('47BBY');
      done();
    }, 300)
  });
})