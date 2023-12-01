const { readFileSync } = require("fs");

const loadInput = (filename: string) => {
  return readFileSync(`${__dirname}/${filename}`, "utf-8");
};

const digits = [
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

const crunchInput = (input: string) => {
  const data = input.split("\n").reduce((total, value) => {
    let code = "";
    for (let i = 0; i < value.length; i++) {
      if (/\d/.test(value[i])) {
        code += value[i];
      } else {
        for (const digit of digits) {
          if (value.slice(i).startsWith(digit)) {
            code += digits.indexOf(digit);
          }
        }
      }
    }
    return total + Number.parseInt(code[0] + code[code.length - 1]);
  }, 0);
  return data;
};

module.exports = {
  solve: (input?: string) => crunchInput(input ?? loadInput("input.txt")),
};

if (process.env["NODE_ENV"] === "test") {
  module.exports.loadInput = loadInput;
  module.exports.crunchInput = crunchInput;
}

export {};
