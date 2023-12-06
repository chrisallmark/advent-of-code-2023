const day = require("./index.ts");

const input = day.loadInput("day06.txt");

describe("Day 1", () => {
  test("Load Input", () => {
    expect(input).toEqual("Time:      7  15   30\nDistance:  9  40  200");
  });

  test("Crunch Input", () => {
    expect(day.crunchInput(input)).toEqual([288, 71503]);
  });

  test("Solve", () => {
    expect(day.crunchInput(input)).toEqual([288, 71503]);
  });
});

export {};
