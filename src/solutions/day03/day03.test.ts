const day = require("./index.ts");

const input = day.loadInput("day03.txt");

describe("Day 1", () => {
  test("Load Input", () => {
    // expect(input).toEqual(
    //   "467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598.."
    // );
  });

  test("Crunch Input", () => {
    expect(day.crunchInput(input)).toEqual([4361, 467835]);
  });

  test("Solve", () => {
    expect(day.crunchInput(input)).toEqual([4361, 467835]);
  });
});

export {};
