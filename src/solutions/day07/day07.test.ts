const day = require("./index.ts");

const input = day.loadInput("day07.txt");

describe("Day 7", () => {
  test("Load Input", () => {
    expect(input).toEqual(
      "32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483"
    );
  });

  test("Crunch Input", () => {
    expect(day.crunchInput(input)).toEqual([6440, 5905]);
  });

  test("Solve", () => {
    expect(day.crunchInput(input)).toEqual([6440, 5905]);
  });
});

export {};
