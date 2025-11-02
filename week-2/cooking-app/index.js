/**
 * Author: Aisha Keller
 * Date: 11/02/2025
 * File Name: index.js
 * Description: Entry point for the cooking app CLI program.
*/

// Import your module using require

const recipes = require("./recipes");

// Demonstrate createRecipe
const ingredients = ["flour", "eggs", "milk"];
console.log(recipes.createRecipe(ingredients));

// Demonstrate setTimer
console.log(recipes.setTimer(15));

// Demonstrate quit
console.log(recipes.quit());

// Implement your CLI program here
function usage() {
  console.log("Cooking App CLI");
  console.log("Usage:");
  console.log("  node index.js create <ingredient1,ingredient2,...>   Create a recipe");
  console.log("  node index.js timer <minutes>                        Set a timer");
  console.log("  node index.js quit                                   Quit the program");
  console.log("  node index.js help                                   Show this help");
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  usage();
  process.exit(0);
}

const command = args[0].toLowerCase();

try {
  switch (command) {
    case "create": {
      if (args.length < 2) {
        console.error("Error: No ingredients provided.");
        usage();
        process.exit(1);
      }
      // Accept either comma-separated single arg or multiple args
      const raw = args.slice(1).join(" ");
      const ingredients = raw.split(",").map(s => s.trim()).filter(Boolean);
      console.log(recipes.createRecipe(ingredients));
      break;
    }

    case "timer": {
      if (args.length < 2) {
        console.error("Error: No minutes provided.");
        usage();
        process.exit(1);
      }
      const minutes = Number(args[1]);
      if (Number.isNaN(minutes) || minutes < 0) {
        console.error("Error: minutes must be a non-negative number.");
        process.exit(1);
      }
      console.log(recipes.setTimer(minutes));
      break;
    }

    case "quit": {
      console.log(recipes.quit());
      process.exit(0);
      break;
    }

    case "help":
    default:
      usage();
  }
} catch (err) {
  console.error("An error occurred:", err.message || err);
  process.exit(1);

}