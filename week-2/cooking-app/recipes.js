/**
 * Author: Aisha Keller
 * Date: 11/02/2025
 * File Name: recipes.js
 * Description: Module for managing recipes in the cooking app.
*/

// Define the createRecipe function
function createRecipe(ingredients) {
  // Implement this function
  if (!Array.isArray(ingredients)) {
    throw new TypeError("Ingredients must be an array");
  }
  return "Recipe created with ingredients: " + ingredients.join(", ");
}

// Define the setTimer function
function setTimer(minutes) {
  // Implement this function
    if (typeof minutes !== "number" || Number.isNaN(minutes) || minutes < 0) {
      throw new TypeError("minutes must be a non-negative number");
  }
  return `Timer set for ${minutes} minutes`;
}

// Define the quit function
function quit() {
  // Implement this function
  return "Program exited";
}

// Export the functions
module.exports = {
  createRecipe,
  setTimer,
  quit
};