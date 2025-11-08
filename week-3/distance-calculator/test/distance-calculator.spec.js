const assert = require('assert');
const calculateDistance = require('../src/distance-calculator');

// Test 1 - Earth to Mars (1.0 AU to 1.52 AU)
function testEarthToMars() {
  try {
    const earth = 1; // AU
    const mars = 1.52; // AU
    const expected = Math.abs(earth - mars); // 0.52 AU
    const actual = calculateDistance(earth, mars);
    assert.strictEqual(actual, expected);
    console.log('testEarthToMars passed');
    return true;
  } catch (err) {
    console.error('testEarthToMars failed:', err.message);
    return false;
  }
}

// Test 2 - Mercury to Neptune (0.39 AU to 30.07 AU)
function testMercuryToNeptune() {
  try {
    const mercury = 0.39; // AU
    const neptune = 30.07; // AU
    const expected = Math.abs(mercury - neptune); // 29.68 AU
    const actual = calculateDistance(mercury, neptune);
    assert.strictEqual(actual, expected);
    console.log('testMercuryToNeptune passed');
    return true;
  } catch (err) {
    console.error('testMercuryToNeptune failed:', err.message);
    return false;
  }
}

// Test 3 - Venus to Saturn (0.72 AU to 9.58 AU)
function testVenusToSaturn() {
  try {
    const venus = 0.72; // AU
    const saturn = 9.58; // AU
    const expected = Math.abs(venus - saturn); // 8.86 AU
    const actual = calculateDistance(venus, saturn);
    assert.strictEqual(actual, expected);
    console.log('testVenusToSaturn passed');
    return true;
  } catch (err) {
    console.error('testVenusToSaturn failed:', err.message);
    return false;
  }
}

// Test Invalid Input 
function testInvalidInputsThrowTypeError() {
  try {
    calculateDistance('one', 1);
    console.error('testInvalidInputsThrowTypeError failed: No error thrown for invalid inputs');
    return false;
  } catch (err) {
    try {
      assert.ok(err instanceof TypeError);
      console.log('testInvalidInputsThrowTypeError passed');
      return true;
    } catch (assertErr) {
      console.error('testInvalidInputsThrowTypeError failed:', assertErr.message);
      return false;
    }
  }
}

// Call your test functions here
testEarthToMars();
testMercuryToNeptune();
testVenusToSaturn();
testInvalidInputsThrowTypeError();