/**
 * Author: Aisha Keller
 * Date: 11/28/2025
 * File Name: server.js
 * Description: Server setup for fantasy game character creation.
 */
"use strict";

const http = require('http');
const url = require('url');

// Store the current character in memory
let currentCharacter = null;

// Valid character classes and genders
const validClasses = ['Warrior', 'Mage', 'Rogue'];
const validGenders = ['Male', 'Female', 'Other'];

/**
 * Helper function to send JSON responses
 * @param {object} res - HTTP response object
 * @param {number} statusCode - HTTP status code
 * @param {object} data - Data to send as JSON
 */

function sendJSONResponse(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

/**
 * Handle POST /create-character requests
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 * @param {object} queryParams - Query parameters
 */
function handleCreateCharacter(req, res, queryParams) {
  const { class: characterClass, gender, funFact } = queryParams;

  // Validate required parameters
  if (!characterClass || !gender || !funFact) {
    return sendJSONResponse(res, 400, {
      error: 'Missing required parameters: class, gender, and funFact are required.'
    });
  }

  // Validate character class
  if (!validClasses.includes(characterClass)) {
    return sendJSONResponse(res, 400, {
      error: `Invalid class. Must be one of: ${validClasses.join(', ')}`
    });
  }

  // Validate gender
  if (!validGenders.includes(gender)) {
    return sendJSONResponse(res, 400, {
      error: `Invalid gender. Must be one of : ${validGenders.join(', ')}`
    });
  }

  // Create the character
  currentCharacter = {
    class: characterClass,
    gender: gender,
    funFact: funFact 
  };

  sendJSONResponse(res, 201, {
    message: 'Character created successfully',
    character: currentCharacter
  });
}

/**
 * Handle POST /confirm-character route
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 */

function handleConfirmCharacter(req, res) {
  if (!currentCharacter) {
    return sendJSONResponse(res, 400, {
      error: 'No character to confirm. Please create a character first.'
    });
  }

  const confirmed = { ...currentCharacter };
  currentCharacter = null; // Clear the character after confirmation

  sendJSONResponse(res, 200, {
    message: 'Character creation confirmed',
    character: confirmed
  });
}

/**
 * Handle GET /view-character route
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 */

function handleViewCharacter(req, res) {
  if (!currentCharacter) {
    return sendJSONResponse(res, 404, {
      error: 'No character found. please create a character first.'
    });
  }

  sendJSONResponse(res, 200, {
    character: currentCharacter
  });
}

// Create the server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;
  const queryParams = parsedUrl.query;

  // Route handling
  if (method === 'POST' && pathname === '/create-character') {
    handleCreateCharacter(req, res, queryParams);
  } else if (method === 'POST' && pathname === '/confirm-character') {
    handleConfirmCharacter(req, res);
  } else if (method === 'GET' && pathname === '/view-character') {
    handleViewCharacter(req, res);
  } else {
    sendJSONResponse(res, 404, { 
      error: 'Route not found' 
    });
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

module.exports = server;