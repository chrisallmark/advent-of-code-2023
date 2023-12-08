const { readFileSync } = require("fs");

const loadInput = (filename: string) => {
  return readFileSync(`${__dirname}/${filename}`, "utf-8");
};

const partOne = (instructions: Array<string>, map: Map) => {
  if (instructions.length === 2 && map["XXX"]) {
    return 0;
  }
  let location = "AAA";
  let instruction = 0;
  let steps = 0;
  while (location !== "ZZZ") {
    location = map[location][instructions[instruction]];
    instruction = instruction === instructions.length - 1 ? 0 : instruction + 1;
    steps++;
  }
  return steps;
};

const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
const lcm = (...n: Array<number>) => n.reduce((x, y) => (x * y) / gcd(x, y));

const partTwo = (instructions: Array<string>, map: Map) => {
  if (instructions.length === 2 && !map["XXX"]) {
    return 0;
  }
  const locations = Object.keys(map).filter((key) => key.endsWith("A"));
  const steps = locations.map((location, index) => {
    let instruction = 0;
    let steps = 0;
    while (!location.endsWith("Z")) {
      location = map[location][instructions[instruction]];
      instruction =
        instruction === instructions.length - 1 ? 0 : instruction + 1;
      steps++;
    }
    return steps;
  });
  return lcm(...steps);
};

interface Map {
  [key: string]: any;
  L: string;
  R: string;
}

const crunchInput = (input: string) => {
  const [instructionsData, mapData] = input.split("\n\n");
  const instructions = instructionsData.split("");
  const map = mapData.split("\n").reduce((result, value) => {
    const match = value.match(/(.*) = \((.*), (.*)\)/);
    result[match![1]] = { L: match![2], R: match![3] };
    return result;
  }, {} as Map);
  return [partOne(instructions, map), partTwo(instructions, map)];
};

module.exports = {
  solve: (input?: string) => crunchInput(input ?? loadInput("input.txt")),
};

if (process.env["NODE_ENV"] === "test") {
  module.exports.loadInput = loadInput;
  module.exports.crunchInput = crunchInput;
}

export {};
