const { readFileSync } = require("fs");

const loadInput = (filename: string) => {
  return readFileSync(`${__dirname}/${filename}`, "utf-8");
};

const handrank = (hand: string, joker: boolean = false) =>
  hand
    .split("")
    .map((card) => (joker ? "J23456789T-QKA" : "-23456789TJQKA").indexOf(card));

interface CardMap {
  [key: string]: any;
}
const cardmap = (hand: Array<string>) =>
  hand.reduce((cardmap, card) => {
    cardmap[card] = cardmap[card] + 1 || 1;
    return cardmap;
  }, {} as CardMap);

const handtype = (hand: string) => {
  const result = cardmap(hand.split(""));
  switch (Object.values(result).sort().join(",")) {
    case "5":
      return 7;
    case "1,4":
      return 6;
    case "2,3":
      return 5;
    case "1,1,3":
      return 4;
    case "1,2,2":
      return 3;
    case "1,1,1,2":
      return 2;
    default:
      return 1;
  }
};

const wildcard = (hand: string) => {
  let besthand = hand;
  let besthandtype = 0;
  "AKQT98765432".split("").forEach((card) => {
    const wildhand = hand.replace(/J/g, card);
    const wildhandtype = handtype(wildhand);
    if (wildhandtype > besthandtype) {
      besthand = wildhand;
      besthandtype = wildhandtype;
    }
  });
  return besthand;
};

const calculate = (input: string, joker: boolean = false) =>
  input
    .split("\n")
    .map((line) => {
      const [hand, bid] = line.split(" ");
      return { hand, bid };
    })
    .sort((a, b) => {
      let handtypeA = joker ? handtype(wildcard(a.hand)) : handtype(a.hand);
      let handtypeB = joker ? handtype(wildcard(b.hand)) : handtype(b.hand);
      if (handtypeA === handtypeB) {
        const handrankA = handrank(a.hand, joker);
        const handrankB = handrank(b.hand, joker);
        for (let i = 0; i < 5; i++) {
          if (handrankA[i] > handrankB[i]) {
            return 1;
          }
          if (handrankA[i] < handrankB[i]) {
            return -1;
          }
        }
        return 0;
      }
      return handtypeA - handtypeB;
    })
    .reduce((result, data, index) => {
      result += Number.parseInt(data.bid) * (index + 1);
      return result;
    }, 0);

const crunchInput = (input: string) => {
  return [calculate(input), calculate(input, true)];
};

module.exports = {
  solve: (input?: string) => crunchInput(input ?? loadInput("input.txt")),
};

if (process.env["NODE_ENV"] === "test") {
  module.exports.loadInput = loadInput;
  module.exports.crunchInput = crunchInput;
}

export {};
