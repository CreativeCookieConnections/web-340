/**
 * Author: Aisha Keller
 * Date: 11/8/2025
 * File Name: distance-calculator.js
 * Description: Module to calculate the distance between two planets
 */

'use strict';

function calculateDistance(planet1, planet2) {
  if (typeof planet1 !== 'number' || typeof planet2 !== 'number' || !isFinite(planet1) || !isFinite(planet2)) {
    throw new TypeError('planet distances must be finite numbers (in AU)');
  }
  return Math.abs(planet1-planet2);
}

module.exports = calculateDistance;