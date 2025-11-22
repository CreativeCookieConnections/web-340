/**
 * Author: Aisha Keller
 * Date: 11/22/2025
 * File Name: pie.js
 * Description: Module for baking pies with specified types and ingredients.
 */
"use strict";

function bakePie(pieType, ingredients) {
  // Define essential ingredients
  const essentialIngredients = ["flour", "sugar", "butter"];

  // Check if all essential ingredients are present
  for (const essential of essentialIngredients) {
    if (!ingredients.includes(essential)) {
      console.log(`Warning: Missing essential ingredient: ${essential}`);
      process.exit(1);
  }
}

// If all essential ingredients are present, return success message
return `Successfully baked a ${pieType} pie!`;
}

module.exports = { bakePie };