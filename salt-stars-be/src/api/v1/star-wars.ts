import { Router } from 'express';
import { CharacterFromSwapi, Character, Planet } from '../../types';
import axios from "axios";
const router = Router();

const parseCharacter = (ch: CharacterFromSwapi, planet?: Planet): Character => {
  /*   const urlSplit = ch.url.split('/'); */
  return {
    name: ch.name,
    gender: ch.gender,
    birthYear: ch.birth_year,
    homeworld: ch.homeworld,
    /*     id: Number(urlSplit.at(-2)), */
    planet: planet?.name,
  };
};

router.get('/characters', async (req, res) => {
  try {
    const response = await axios.get(`https://swapi.dev/api/people/`);
/*     const data = (await response.json()) as { results: CharacterFromSwapi[] }; */

const data = response.data as  { results: CharacterFromSwapi[] };
console.log(response.data)

    const parsedData = await Promise.all(
      data.results.map(async (character) => {
        const planetResponse = await fetch(character.homeworld);
        const planet = (await planetResponse.json()) as Planet;

        return parseCharacter(character, planet);
      })
    );

    console.log(parsedData);

    res.json({
      characters: parsedData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch all characters from SWAPI' });
  }
});

router.get('/characters/:id', async (req, res) => {
  try {
    const response = await fetch(
      `https://swapi.dev/api/people/${req.params.id}/`
    );

    const character = (await response.json()) as CharacterFromSwapi;

    /*  const planetRes = await fetch(character.homeworld);

    const plan = (await planetRes.json()) as Planet;

    console.log(plan.name, 'full thing', plan);
*/
    const parsedCH = parseCharacter(character);

    //console.log(parsedCH);

    res.json({
      character: {
        ...parsedCH,
        planet: null,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from SWAPI' });
  }
});

export default router;
