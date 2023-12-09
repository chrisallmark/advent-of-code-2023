const { readFileSync } = require("fs");

const loadInput = (filename: string) => {
  return readFileSync(`${__dirname}/${filename}`, "utf-8");
};

const reducer = (data: Array<number>): Array<number> => {
  const reduced = data.reduce((result, value, index) => {
    if (index + 1 < data.length) {
      result.push(data[index + 1] - value);
    }
    return result;
  }, [] as Array<number>);
  if (reduced.reduce((result, value) => result && value === 0, true)) {
    reduced.push(0);
  } else {
    const recursed = reducer(reduced);
    reduced.push(reduced[reduced.length - 1] + recursed[recursed.length - 1]);
  }
  return reduced;
};

const crunchInput = (input: string) => {
  const partOne = input.split("\n").reduce((result, line) => {
    const data = line.split(" ").map((value) => Number.parseInt(value));
    const reduced = reducer(data);
    return result + data[data.length - 1] + reduced[reduced.length - 1];
  }, 0);
  const partTwo = input.split("\n").reduce((result, line) => {
    const data = line.split(" ").map((value) => Number.parseInt(value));
    const reduced = reducer(data.reverse());
    return result + data[data.length - 1] + reduced[reduced.length - 1];
  }, 0);
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
