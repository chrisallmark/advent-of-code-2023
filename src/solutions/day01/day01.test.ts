const day = require("./index.ts");

const inputPart1 = day.loadInput("day01-part1.txt");
const inputPart2 = day.loadInput("day01-part2.txt");

describe("Day 1", () => {
  test("Load Input", () => {
    expect(inputPart1).toEqual("1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet");
    expect(inputPart2).toEqual(
      "two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen"
    );
  });

  test("Crunch Input", () => {
    expect(day.crunchInput(inputPart1)[0]).toEqual(142);
    expect(day.crunchInput(inputPart2)[1]).toEqual(281);
  });

  test("Solve", () => {
    expect(day.solve(inputPart1)[0]).toEqual(142);
    expect(day.solve(inputPart2)[1]).toEqual(281);
  });
});

export {};
