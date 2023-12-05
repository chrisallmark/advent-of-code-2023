import { number } from "yargs";

const { readFileSync } = require("fs");

const loadInput = (filename: string) => {
  return readFileSync(`${__dirname}/${filename}`, "utf-8");
};

interface Mapper {
  [key: string]: any;
  soil(n: number): number;
  fertilizer(n: number): number;
  water(n: number): number;
  light(n: number): number;
  temperature(n: number): number;
  humidity(n: number): number;
  location(n: number): number;
}

const crunchInput = (input: string) => {
  let seeds: Array<number> = [];
  let mapper: Mapper = {
    soil: (n: number) => n, // return fertilizer
    fertilizer: (n: number) => n,
    water: (n: number) => n,
    light: (n: number) => n,
    temperature: (n: number) => n,
    humidity: (n: number) => n,
    location: (n: number) => n,
  };
  let reverseMapper: Mapper = {
    soil: (n: number) => n,
    fertilizer: (n: number) => n,
    water: (n: number) => n,
    light: (n: number) => n,
    temperature: (n: number) => n,
    humidity: (n: number) => n,
    location: (n: number) => n, // returns humidity
  };
  input.split("\n\n").forEach((group, index) => {
    if (index === 0) {
      seeds = group
        .replace("seeds: ", "")
        .split(" ")
        .map((seed) => Number.parseInt(seed));
    } else {
      const type = group.match(/.*-to-(.*) map:/)![1];
      const map = group
        .slice(group.indexOf("\n") + 1)
        .split("\n")
        .map((line) => {
          const info = line.split(" ");
          const result = {
            dst: Number.parseInt(info[0]),
            src: Number.parseInt(info[1]),
            len: Number.parseInt(info[2]),
          };
          return result;
        });
      mapper[type] = (n: number) => {
        let result = n;
        map.forEach((item) => {
          if (n >= item.src && n < item.src + item.len) {
            result = item.dst + (n - item.src);
          }
        });
        return result;
      };
      reverseMapper[type] = (n: number) => {
        let result = n;
        map.forEach((item) => {
          if (n >= item.dst && n < item.dst + item.len) {
            result = item.src + (n - item.dst);
          }
        });
        return result;
      };
    }
  });
  const partOne = seeds.reduce((result, seed) => {
    const soil = mapper.soil(seed);
    const fertilizer = mapper.fertilizer(soil);
    const water = mapper.water(fertilizer);
    const light = mapper.light(water);
    const temperature = mapper.temperature(light);
    const humidity = mapper.humidity(temperature);
    const location = mapper.location(humidity);
    return Math.min(location, result);
  }, Number.MAX_SAFE_INTEGER);
  // use brute force
  let location = 0;
  let partTwo = 0;
  while (partTwo === 0) {
    const humidity = reverseMapper.location(location);
    const temperature = reverseMapper.humidity(humidity);
    const light = reverseMapper.temperature(temperature);
    const water = reverseMapper.light(light);
    const fertilizer = reverseMapper.water(water);
    const soil = reverseMapper.fertilizer(fertilizer);
    const seed = reverseMapper.soil(soil);
    for (let i = 0; i < seeds.length; i += 2) {
      if (seed >= seeds[i] && seed < seeds[i] + seeds[i + 1]) {
        partTwo = location;
        break;
      }
    }
    location++;
  }
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
