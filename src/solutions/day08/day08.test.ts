const day = require("./index.ts");

const inputPart1 = day.loadInput("day08-part1.txt");
const inputPart2 = day.loadInput("day08-part2.txt");

describe("Day 8", () => {
  test("Load Input", () => {
    expect(inputPart1).toEqual(
      "RL\n\nAAA = (BBB, CCC)\nBBB = (DDD, EEE)\nCCC = (ZZZ, GGG)\nDDD = (DDD, DDD)\nEEE = (EEE, EEE)\nGGG = (GGG, GGG)\nZZZ = (ZZZ, ZZZ)"
    );
    expect(inputPart2).toEqual(
      "LR\n\n11A = (11B, XXX)\n11B = (XXX, 11Z)\n11Z = (11B, XXX)\n22A = (22B, XXX)\n22B = (22C, 22C)\n22C = (22Z, 22Z)\n22Z = (22B, 22B)\nXXX = (XXX, XXX)"
    );
  });

  test("Crunch Input", () => {
    expect(day.crunchInput(inputPart1)[0]).toEqual(2);
    expect(day.crunchInput(inputPart2)[1]).toEqual(6);
  });

  test("Solve", () => {
    expect(day.crunchInput(inputPart1)[0]).toEqual(2);
    expect(day.crunchInput(inputPart2)[1]).toEqual(6);
  });
});

export {};
