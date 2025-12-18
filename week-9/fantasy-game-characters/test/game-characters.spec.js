/**
 * Author: Aisha Keller
 * Date: 12/18/2025
 * File Name: game-characters.spec.js
 * Description: Unit tests for GameCharacters class
 */

"use strict";

const { GameCharacters } = require("../src/game-characters");

describe("GameCharacters", () => {
  let gameCharacters;

  beforeEach(() => {
    gameCharacters = new GameCharacters("game-characters-data.js");
  });

  // Test 1: should return game characters data
  test("should return game characters data", (done) => {
    gameCharacters.getCharacters((error, data) => {
      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      
      // Verify structure of first character
      expect(data[0]).toHaveProperty("class");
      expect(data[0]).toHaveProperty("gender");
      expect(data[0]).toHaveProperty("specialAbility");
      
      done();
    });
  });

  // Test 2: should handle an error when the game characters data script is not found
  test("should handle an error when the game characters data script is not found", (done) => {
    const invalidGameCharacters = new GameCharacters("non-existent-script.js");
    
    invalidGameCharacters.getCharacters((error, data) => {
      expect(error).not.toBeNull();
      expect(data).toBeNull();
      
      done();
    });
  });

  // Test 3: should handle an error when the game characters data script fails
  test("should handle an error when the game characters data script fails", (done) => {
    const failingGameCharacters = new GameCharacters("failing-script.js");
    
    failingGameCharacters.getCharacters((error, data) => {
      expect(error).not.toBeNull();
      expect(data).toBeNull();
      
      done();
    });
  });
});