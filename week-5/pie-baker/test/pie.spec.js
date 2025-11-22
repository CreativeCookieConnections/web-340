/**
 * Author: Aisha Keller
 * Date: 11/22/2025
 * File Name: pie.spec.js
 * Description: Test suite for the pie baking module.
 */

"use strict";

const { bakePie } = require("../src/pie");

describe("bakePie", () => {
    // Test 1: Successfully baking a pie with all essential ingredients
    test("should return success message when all essential ingredients are provided", () => {
        const pieType = "apple";
        const ingredients = ["flour", "sugar", "butter", "apples", "cinnamon"];
        const result = bakePie(pieType, ingredients);
        expect(result).toBe("Successfully baked a apple pie!");
    });

    // Test 2: Successfully baking a different pie type with only essential ingredients
    test("should return success message with only essential ingredients", () => {
        const pieType = "cherry";
        const ingredients = ["flour", "sugar", "butter"];
        const result = bakePie(pieType, ingredients);
        expect(result).toBe("Successfully baked a cherry pie!");
    });

    // Test 3: Missing flour - should call process.exit(1)
    test("should log warning and exit when flour is missing", () => {
        const mockExit = jest.spyOn(process, "exit").mockImplementation((code) => {
            throw new Error(`process.exit: ${code}`);
        });
        const mockLog = jest.spyOn(console, "log").mockImplementation();

        const pieType = "pumpkin";
        const ingredients = ["sugar", "butter", "pumpkin"];

        expect(() => {
            bakePie(pieType, ingredients);
        }).toThrow("process.exit: 1");

        expect(mockLog).toHaveBeenCalledWith("Warning: Missing essential ingredient: flour");
        expect(mockExit).toHaveBeenCalledWith(1);

        mockExit.mockRestore();
        mockLog.mockRestore();
    });

    // Test 4: Missing sugar - should call process.exit(1)
    test("should log warning and exit when sugar is missing", () => {
        const mockExit = jest.spyOn(process, "exit").mockImplementation((code) => {
            throw new Error(`process.exit(${code})`);
        });
        const mockLog = jest.spyOn(console, "log").mockImplementation();

        const pieType = "pecan";
        const ingredients = ["flour", "butter", "pecans"];

        expect(() => {
            bakePie(pieType, ingredients);
        }).toThrow("process.exit(1)");

        expect(mockLog).toHaveBeenCalledWith("Warning: Missing essential ingredient: sugar");
        expect(mockExit).toHaveBeenCalledWith(1);

        mockExit.mockRestore();
        mockLog.mockRestore();
    });

    // Test 5: Missing butter - should call process.exit(1)
    test("should log warning and exit when butter is missing", () => {
        const mockExit = jest.spyOn(process, "exit").mockImplementation((code) => {
            throw new Error(`process.exit(${code})`);
        });
        const mockLog = jest.spyOn(console, "log").mockImplementation();

        const pieType = "blueberry";
        const ingredients = ["flour", "sugar", "blueberries"];

        expect(() => {
            bakePie(pieType, ingredients);
        }).toThrow("process.exit(1)");

        expect(mockLog).toHaveBeenCalledWith("Warning: Missing essential ingredient: butter");
        expect(mockExit).toHaveBeenCalledWith(1);

        mockExit.mockRestore();
        mockLog.mockRestore();

    });

});