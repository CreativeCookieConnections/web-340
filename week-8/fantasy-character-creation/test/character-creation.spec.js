/**
 * Author: Aisha Keller
 * Date: 12/14/2025
 * File Name: character-creation.spec.js
 * Description: Test suite for the character-creation module.
 */

"use strict";

const fs = require('fs').promises;
const path = require('path');

describe("Character Creation Module", () => {
  let createCharacter;
  let getCharacters;
  const testDataDir = path.join(__dirname, '../test-data');
  const testFilePath = path.join(testDataDir, 'test-characters.json');

  beforeEach(async () => {
    jest.resetModules();
    ({ createCharacter, getCharacters } = require('../src/character-creation'));
    
    // Create test directory if it doesn't exist
    try {
      await fs.mkdir(testDataDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }
  });

  afterEach(async () => {
    // Clean up test file after each test
    try {
      await fs.unlink(testFilePath);
    } catch (err) {
      // File might not exist
    }
  });

  // Test 1: Test that data can be written to a file
  test('should write character data to a file', async () => {
    const character = {
      class: 'Warrior',
      gender: 'Male',
      element: 'Fire'
    };

    await createCharacter(character);
    
    // Verify the file was created
    const fileContent = await fs.readFile(testFilePath, 'utf8');
    const characters = JSON.parse(fileContent);
    
    expect(characters).toHaveLength(1);
    expect(characters[0]).toMatchObject(character);
  });

  // Test 2: Test that data can be read from a file
  test('should read character data from a file', async () => {
    const characters = [
      { class: 'Mage', gender: 'Female', element: 'Ice' },
      { class: 'Rogue', gender: 'Other', skill: 'Stealth' }
    ];

    // Write test data to file
    await fs.writeFile(testFilePath, JSON.stringify(characters), 'utf8');
    
    // Read the data using the module function
    const result = await getCharacters();
    
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject(characters[0]);
    expect(result[1]).toMatchObject(characters[1]);
  });

  // Test 3: Test that it handles errors when reading from the file
  test('should handle errors when reading from a non-existent file', async () => {
    // Ensure the file doesn't exist
    try {
      await fs.unlink(testFilePath);
    } catch (err) {
      // File doesn't exist, which is what we want
    }
    
    // Attempt to read from non-existent file should throw error or return empty array
    await expect(getCharacters()).rejects.toThrow();
  });
});