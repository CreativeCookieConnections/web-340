/**
 * Author: Aisha Keller
 * Date: 12/05/2025
 * File Name: character-creator.js
 * Description: Duplex stream for creating fantasy game characters.
 */
"use strict";

const { Duplex } = require('stream');

class CharacterCreator extends Duplex {
  constructor(options) {
    super(options);
    this.data = '';
  }

  _write(chunk, encoding, callback) {
    const input = chunk.toString();

  // Check for empty string and emit error
  if (input === '') {
    const error = new Error('Invalid data: empty string provided');
    this.emit('error', error);
    callback();
    return;
  }

  try {
    // Parse the character data
    const characterData = JSON.parse(input);

    // Format the character description
    const formattedOutput = `Character Created: \nClass: ${characterData.class}\nGender: ${characterData.gender}\nFun Fact: ${characterData.funFact}\n`;

    // Store the formatted data
    this.data = formattedOutput;

    // Push the data to the readable side
    this.push(this.data);

    // Call the callback to indicate write is complete
    callback();
  } catch (error) {
    callback(error);
  }
}

  _read(size) {
    // Push null to indicate end of data
    // This is called automatically when data is read
  }
}

module.exports = CharacterCreator;