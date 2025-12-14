/**
 * Author: Aisha Keller
 * Date: 12/14/2025
 * File Name: character-creation.js
 * Description: Module for creating and retrieving fantasy characters using promises (async/await).
 */

"use strict";

const fs = require('fs').promises;
const path = require('path');

// Use __dirname to get the directory name of the current module
const DATA_DIR = path.join(__dirname, '../test-data');
const CHARACTERS_FILE = path.join(DATA_DIR, 'test-characters.json');

/**
 * Creates a new character and saves it to the file
 * @param {Object} character - The character object to save
 * @param {string} character.class - Character class (Warrior, Mage, Rogue)
 * @param {string} character.gender - Character gender (Male, Female, Other)
 * @param {string} [character.element] - Optional element attribute
 * @param {string} [character.skill] - Optional unique skill attribute
 * @returns {Promise<void>}
 */
async function createCharacter(character) {
  try {
    // Ensure the data directory exists
    await fs.mkdir(DATA_DIR, { recursive: true });

    let characters = [];
    
    // Try to read existing characters
    try {
      const fileContent = await fs.readFile(CHARACTERS_FILE, 'utf8');
      characters = JSON.parse(fileContent);
    } catch (err) {
      // File doesn't exist yet, start with empty array
      if (err.code !== 'ENOENT') {
        throw err; // Re-throw if it's not a "file not found" error
      }
    }

    // Add the new character
    characters.push(character);

    // Write the updated characters array to the file
    await fs.writeFile(CHARACTERS_FILE, JSON.stringify(characters), 'utf8');
  } catch (err) {
    throw new Error(`Error creating character: ${err.message}`);
  }
}

/**
 * Retrieves all characters from the file
 * @returns {Promise<Array>} Array of character objects
 */
async function getCharacters() {
  try {
    const fileContent = await fs.readFile(CHARACTERS_FILE, 'utf8');
    return JSON.parse(fileContent);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('Characters file not found');
    }
    throw new Error(`Error reading characters: ${err.message}`);
  }
}

module.exports = { createCharacter, getCharacters };
