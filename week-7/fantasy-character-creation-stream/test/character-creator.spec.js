/**
 * Author: Aisha Keller
 * Date: 12/05/2025
 * File Name: character-creator.spec.js
 * Description: Tests for the CharacterCreator duplex stream.
 */
"use strict";

const CharacterCreator = require('../src/character-creator');

describe('CharacterCreator', () => {
  let characterCreator;

  beforeEach(() => {
    characterCreator = new CharacterCreator();
  });

  test("should process data correctly when written to", (done) => {
    const characterData = JSON.stringify({
      class: 'Warrior',
      gender: 'Male',
      funFact: 'Loves to collect ancient swords.'
    });

    characterCreator.on('data', (data) => {
      expect(data).toBeDefined();
      expect(data.toString()).toContain('Warrior');
      expect(data.toString()).toContain('Male');
      expect(data.toString()).toContain('Loves to collect ancient swords.');
      done();
    });
    
    characterCreator.write(characterData);
  });

test("should emit 'error' when invalid data is written", (done) => {
  characterCreator.on('error', (err) => {
    expect(err).toBeDefined();
    expect(err.message).toBe('Invalid data: empty string provided');
    done();
  });

  characterCreator.write('');
});

test("should transform data correctly when written to", (done) => {
  const characterData = JSON.stringify({
    class: 'Mage',
    gender: 'Female',
    funFact: 'Can summon lightning storms.'
  });

  characterCreator.on('data', (data) => {
    const output = data.toString();
    expect(output).toContain('Character Created:');
    expect(output).toContain('Class: Mage');
    expect(output).toContain('Gender: Female');
    expect(output).toContain('Fun Fact: Can summon lightning storms.');
    done();
  });

  characterCreator.write(characterData);
  });
});