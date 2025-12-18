/**
 * Author: Aisha Keller
 * Date: 12/18/2025
 * File Name: game-characters.js
 * Description: GameCharacters class that retrieves and processes data from a separate JavaScript file using Node.js child processes
 */

"use strict";

const { spawn } = require("child_process");
const path = require("path");

class GameCharacters {
  constructor(scriptFileName) {
    // Use path.join to create the path to the script file
    this.scriptPath = path.join(__dirname, scriptFileName);
  }

  getCharacters(callback) {
    // Initialize variables to capture output and errors
    let output = "";
    let errorOutput = "";

    // Spawn a child process to run the script
    const child = spawn("node", [this.scriptPath]);

    // Handle data from stdout
    child.stdout.on("data", (data) => {
      output += data.toString();
    });

    // Handle data from stderr
    child.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    // Handle errors while spawning the child process
    child.on("error", (error) => {
      console.error(`Error spawning child process: ${error.message}`);
      callback(error, null);
    });

    // Handle the close event of the child process
    child.on("close", (code) => {
      // If there was an error output or non-zero exit code
      if (errorOutput || code !== 0) {
        callback(new Error(errorOutput || `Process exited with code ${code}`), null);
      } else {
        try {
          // Parse the JSON output
          const data = JSON.parse(output);
          callback(null, data);
        } catch (parseError) {
          callback(parseError, null);
        }
      }
    });
  }
}

module.exports = { GameCharacters };