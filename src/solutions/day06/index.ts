const { readFileSync } = require("fs");

const loadInput = (filename: string) => {
  return readFileSync(`${__dirname}/${filename}`, "utf-8");
};

const calculate = (time: number, distance: number) => {
  let result = 0;
  for (let t = 0; t <= time; t++) {
    let s = t;
    const traveled = (time - t) * s;
    if (traveled > distance) {
      result++;
    }
  }
  return result;
};

const partOne = (input: string) => {
  const data = input.split("\n");
  const times = data[0]
    .replace(/Time: +/, "")
    .split(/ +/)
    .map((time) => Number.parseInt(time));
  const distances = data[1]
    .replace(/Distance: +/, "")
    .split(/ +/)
    .map((distance) => Number.parseInt(distance));
  const wins = new Array(times.length).fill(0);
  times.forEach((time, index) => {
    wins[index] = calculate(time, distances[index]);
  });
  return wins.reduce((total, value) => (total = total * value), 1);
};

const partTwo = (input: string) => {
  const data = input.split("\n");
  const time = Number.parseInt(
    data[0].replace(/Time: +/, "").replace(/ +/g, "")
  );
  const distance = Number.parseInt(
    data[1].replace(/Distance: +/, "").replace(/ +/g, "")
  );
  return calculate(time, distance);
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
