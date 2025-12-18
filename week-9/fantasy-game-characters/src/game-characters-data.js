/**
 * Author: Aisha Keller
 * Date: 12/18/2025
 * File Name: game-characters-data.js
 * Description: Script that outputs game character data as JSON
 */

"use strict";

// Array of game characters with Class, Gender, and a fun property
const characters = [
  {
    class: "Warrior",
    gender: "Male",
    specialAbility: "Berserker Rage - Doubles attack power when health drops below 30%"
  },
  {
    class: "Mage",
    gender: "Female",
    specialAbility: "Arcane Mastery - Can cast two spells simultaneously"
  },
  {
    class: "Rogue",
    gender: "Other",
    specialAbility: "Shadow Step - Can teleport short distances through shadows"
  },
  {
    class: "Warrior",
    gender: "Female",
    specialAbility: "Shield Bash - Stuns enemies and reflects projectiles"
  },
  {
    class: "Mage",
    gender: "Male",
    specialAbility: "Time Warp - Slows time for all enemies in the area"
  },
  {
    class: "Rogue",
    gender: "Male",
    specialAbility: "Poison Master - All attacks apply deadly venom damage over time"
  }
];

// Log the JSON stringified array to the console
console.log(JSON.stringify(characters));