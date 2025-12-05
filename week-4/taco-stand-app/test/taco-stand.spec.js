"use strict";

/**
 * Author: Aisha Keller
 * Date: 11/16/2025
 * File Name: taco-stand.spec.js
 * Description: This file contains tests for the TacoStandEmitter class.
 */

"use strict";

const assert = require("assert");
const TacoStandEmitter = require("../src/taco-stand");
const tacoStand = new TacoStandEmitter();

// Test 1: serveCustomer method
function testServeCustomer() {
    try {
        // Register event listener for "serve" event
        tacoStand.on("serve", (customer) => {
            assert.strictEqual(customer, "John Doe");
        });

        // Call the serveCustomer method
        tacoStand.serveCustomer("John Doe");

        console.log("Passed testServeCustomer");
    } catch (error) {
        console.error(`Failed testServeCustomer: ${error.message}`);
    }
}

// Test 2: prepareTaco method
function testPrepareTaco() {
    try {
        // register event listener for "prepare" event
        tacoStand.on("prepare", (taco) => {
            assert.strictEqual(taco, "Beef Taco");
        });

        // Call the prepareTaco method
        tacoStand.prepareTaco("Beef Taco");

        console.log("passed testPrepareTaco");
    } catch (error) {
        console.error(`Failed testPrepareTaco: ${error.message}`);
    }
}

// Test 3: handleRush method
function testHandleRush() {
    try {
        // Register event listener for "rush" event
        tacoStand.on("rush", (rush) => {
            assert.strictEqual(rush, "Lunch Rush");
        });

        // Call the handleRush method
        tacoStand.handleRush("Lunch Rush");

        console.log("Passed testHandleRush");
    } catch (error) {
        console.error(`Failed testHandleRush: ${error.message}`);
    }
}

// Run all tests
testServeCustomer();
testPrepareTaco();
testHandleRush();