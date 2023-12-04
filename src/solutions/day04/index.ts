const { readFileSync } = require("fs");

const loadInput = (filename: string) => {
  return readFileSync(`${__dirname}/${filename}`, "utf-8");
};

const crunchInput = (input: string) => {
  const lines = input.split("\n");
  const copies = new Array(lines.length).fill(1);
  const partOne = lines.reduce((total, line) => {
    const match = line.match(/Card +(\d+): +(.*) +\| +(.*)/);
    const game = Number.parseInt(match![1]);
    const winners = match![2].split(/ +/);
    const scratchcard = match![3].split(/ +/);
    const matches = scratchcard.filter((value) => winners.includes(value));
    // partOne
    total += matches.reduce((score) => (score === 0 ? 1 : score + score), 0);
    // partTwo
    for (let i = 0; i < matches.length; i++) {
      copies[game + i] += copies[game - 1];
    }
    return total;
  }, 0);
  const partTwo = copies.reduce((sum, value) => (sum += value), 0);
  return [partOne, partTwo];
};

module.exports = {
  solve: (input?: string) => crunchInput(input ?? loadInput("input.txt")),
};

if (process.env["NODE_ENV"] === "test") {
  module.exports.loadInput = loadInput;
  module.exports.crunchInput = crunchInput;
}

export {};
