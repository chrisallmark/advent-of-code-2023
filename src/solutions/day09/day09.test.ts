const day = require("./index.ts");

const input = day.loadInput("day09.txt");

describe("Day 9", () => {
  test("Load Input", () => {
    expect(input).toEqual("0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45");
  });

  test("Crunch Input", () => {
    expect(day.crunchInput(input)).toEqual([114, 2]);
  });

  test("Solve", () => {
    expect(day.crunchInput(input)).toEqual([114, 2]);
  });
});

export {};
