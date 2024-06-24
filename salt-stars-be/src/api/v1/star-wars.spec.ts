import request from "supertest"
import express from "express"
import starWarsRoutes from "./star-wars"

const app = express()
app.use("/api/v1/star-wars", starWarsRoutes)

describe("Star Wars API Endpoints", () => {
  it("should fetch a character by ID and return simplified data", async () => {
    const response = await request(app).get("/api/v1/star-wars/characters/1")
    expect(response.status).toBe(200)
    const { character } = response.body
    expect(character).toHaveProperty("name")
    expect(character).toHaveProperty("birthYear")
    expect(character).toHaveProperty("gender")
  })

  it("should fetch all characters", async () => {
    const response = await request(app).get("/api/v1/star-wars/characters")
    expect(response.status).toBe(200)
    const { characters } = response.body
    expect(characters.length).toBe(10)

    const firstCharacter = characters[0]
    // Check properties of the first character.
    /**
     *  "name": "Luke Skywalker",
        "gender": "male",
        "birthYear": "19BBY",
        "homeworld": "https://swapi.dev/api/planets/1/",
        "id": 1
     */
    expect(Object.keys(firstCharacter).length).toBe(5)
    expect(firstCharacter).toHaveProperty("name")
    expect(firstCharacter).toHaveProperty("birthYear")
    expect(firstCharacter).toHaveProperty("gender")
    expect(firstCharacter).toHaveProperty("homeworld")
    expect(firstCharacter).toHaveProperty("planet")
  })
})
