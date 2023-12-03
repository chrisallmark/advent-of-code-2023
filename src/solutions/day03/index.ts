const { readFileSync } = require("fs");

const loadInput = (filename: string) => {
  return readFileSync(`${__dirname}/${filename}`, "utf-8");
};

const crunchInput = (input: string) => {
  interface SchematicData {
    id: string;
    type: string;
    x: number;
    y: number;
    gear?: Array<number>;
    ratio?: number;
  }
  const schematic: Array<SchematicData> = [];
  input.split("\n").map((line, index) => {
    let id = "";
    for (let i = 0; i < line.length; i++) {
      if (/\d/.test(line[i])) {
        id += line[i];
      } else {
        if (id.length > 0) {
          schematic.push({ id, type: "part", x: i - id.length, y: index });
        }
        if (line[i] !== ".") {
          schematic.push({
            id: line[i],
            type: "symbol",
            x: i,
            y: index,
            gear: [],
            ratio: 0,
          });
        }
        id = "";
      }
    }
    if (id.length > 0) {
      schematic.push({
        id,
        type: "part",
        x: line.length - id.length,
        y: index,
      });
    }
  });
  const partOne = schematic
    .filter((value) => value.type === "part")
    .reduce((result, part) => {
      let adjacent = false;
      for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= part.id.length; x++) {
          adjacent =
            schematic.filter((symbol) => {
              adjacent =
                symbol.type === "symbol" &&
                part.x + x === symbol.x &&
                part.y + y === symbol.y;
              if (symbol.id === "*" && adjacent) {
                symbol.gear!.push(Number.parseInt(part.id));
                symbol.ratio = symbol.gear!.reduce(
                  (total, value) => total * value,
                  1
                );
              }
              return adjacent;
            }).length > 0;
          if (adjacent) break;
        }
        if (adjacent) break;
      }
      if (adjacent) {
        result += Number.parseInt(part.id);
      }
      return result;
    }, 0);
  const partTwo = schematic
    .filter((symbol) => symbol.type === "symbol")
    .reduce((total, symbol) => {
      if (symbol.gear!.length > 1) {
        total += symbol.ratio || 0;
      }
      return total;
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
