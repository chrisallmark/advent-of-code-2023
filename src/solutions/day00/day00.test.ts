const day = require("./index.ts");

const input = day.loadInput("day00.txt");

describe("Day 1", () => {
  test("Load Input", () => {
    expect(input).toEqual("");
  });

  test("Crunch Input", () => {
    expect(day.crunchInput(input)).toEqual([0, 0]);
  });

  test("Solve", () => {
    expect(day.crunchInput(input)).toEqual([0, 0]);
  });
});

export {};
