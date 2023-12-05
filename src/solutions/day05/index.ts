import { number } from "yargs";

const { readFileSync } = require("fs");

const loadInput = (filename: string) => {
  return readFileSync(`${__dirname}/${filename}`, "utf-8");
};

const crunchInput = (input: string) => {
  interface Mapper {
    [key: string]: any;
    soil(n: number, r?: boolean): number;
    fertilizer(n: number, r?: boolean): number;
    water(n: number, r?: boolean): number;
    light(n: number, r?: boolean): number;
    temperature(n: number, r?: boolean): number;
    humidity(n: number, r?: boolean): number;
    location(n: number, r?: boolean): number;
  }
  let mapper: Mapper = {
    soil: (n: number) => n,
    fertilizer: (n: number) => n,
    water: (n: number) => n,
    light: (n: number) => n,
    temperature: (n: number) => n,
    humidity: (n: number) => n,
    location: (n: number) => n,
  };
  let seeds: Array<number> = [];
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
      mapper[type] = (n: number, r: boolean = false) => {
        let result = n;
        map.forEach((item) => {
          if (r) {
            if (n >= item.dst && n < item.dst + item.len) {
              result = item.src + (n - item.dst);
            }
          } else {
            if (n >= item.src && n < item.src + item.len) {
              result = item.dst + (n - item.src);
            }
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
    const humidity = mapper.location(location, true);
    const temperature = mapper.humidity(humidity, true);
    const light = mapper.temperature(temperature, true);
    const water = mapper.light(light, true);
    const fertilizer = mapper.water(water, true);
    const soil = mapper.fertilizer(fertilizer, true);
    const seed = mapper.soil(soil, true);
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
