const { readFileSync } = require("fs");

const loadInput = (filename: string) => {
  return readFileSync(`${__dirname}/${filename}`, "utf-8");
};

const calculate = (value: string) =>
  value.length === 0 ? 0 : Number.parseInt(value[0] + value[value.length - 1]);

const partOne = (input: string) => {
  return input.split("\n").reduce((total, value) => {
    return total + calculate(value.replace(/\D/g, ""));
  }, 0);
};

const partTwo = (input: string) => {
  const words = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  return input.split("\n").reduce((total, value) => {
    for (const word of words) {
      const index = value.indexOf(word);
      if (index >= 0) {
        value = value.replace(
          new RegExp(word, "g"),
          `${word[0]}${words.indexOf(word)}${word.slice(2)}`
        );
      }
    }
    return total + calculate(value.replace(/\D/g, ""));
  }, 0);
};

const crunchInput = (input: string) => {
  return [partOne(input), partTwo(input)];
};

module.exports = {
  solve: (input?: string) => crunchInput(input ?? loadInput("input.txt")),
};

if (process.env["NODE_ENV"] === "test") {
  module.exports.loadInput = loadInput;
  module.exports.crunchInput = crunchInput;
}

export {};
