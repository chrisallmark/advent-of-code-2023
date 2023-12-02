const { readFileSync } = require("fs");

const loadInput = (filename: string) => {
  return readFileSync(`${__dirname}/${filename}`, "utf-8");
};

const crunchInput = (input: string) => {
  let result = [0, 0];
  input.split("\n").map((line, index) => {
    const crunch = line.split(/(:|,|;) /).reduce(
      (previousValue, currentValue) => {
        const match = currentValue.match(/(\d+) (blue|green|red)/);
        if (match) {
          const count = Number.parseInt(match![1]);
          const colour = match![2];
          switch (colour) {
            case "blue":
              previousValue.possible &&= count <= 14;
              previousValue.fewest.blue = Math.max(
                previousValue.fewest.blue,
                count
              );
              break;
            case "green":
              previousValue.possible &&= count <= 13;
              previousValue.fewest.green = Math.max(
                previousValue.fewest.green,
                count
              );
              break;
            case "red":
              previousValue.possible &&= count <= 12;
              previousValue.fewest.red = Math.max(
                previousValue.fewest.red,
                count
              );
              break;
          }
        }
        return previousValue;
      },
      {
        possible: true,
        fewest: {
          blue: 0,
          green: 0,
          red: 0,
        },
      }
    );
    if (crunch.possible) {
      result[0] += index + 1;
    }
    result[1] += crunch.fewest.blue * crunch.fewest.green * crunch.fewest.red;
  });
  return result;
};

module.exports = {
  solve: (input?: string) => crunchInput(input ?? loadInput("input.txt")),
};

if (process.env["NODE_ENV"] === "test") {
  module.exports.loadInput = loadInput;
  module.exports.crunchInput = crunchInput;
}

export {};
