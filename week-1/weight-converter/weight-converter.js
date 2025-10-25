/**
 * Author: Aisha Keller
 * Date: 10/25/2025
 * File Name: weight-converter.js
 * Description: Create a Node.js script that converts pounds to kilograms. The script will take one command line argument, which is the weight in pounds, and print the converted weight into kilograms to the console. 
*/

"use strict";

/**
 * Node.js script to convert pounds to kilograms.
 * Usage: node weight-converter.js <pounds>
 */

const arg = process.argv[2];

if (!arg) {
    console.error("Usage: node weight-converter.js <pounds>")
    process.exit(1);
}

const pounds = parseFloat(arg);

if (Number.isNaN(pounds)) {
    console.error("Error: Input must be a number.");
    process.exit(1);
}

const KG_PER_POUND = 0.45359237;
const kilograms = pounds * KG_PER_POUND;

// Output only the numeric kilogram value with two decimals
console.log(kilograms.toFixed(2));