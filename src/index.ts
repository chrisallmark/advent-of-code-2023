const solutions = require("./solutions");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 [-d number]")
  .options({
    d: {
      type: "number",
      alias: "day",
    },
  }).argv;

if (argv.day) {
  console.log(
    `Solutions for Day${argv.day}: ${solutions[`day${argv.day}`].solve()}`
  );
} else {
  for (let i = 1; i <= 25; i++) {
    try {
      console.log(`Solutions for Day ${i}: ${solutions[`day${i}`].solve()}`);
    } catch (e) {
      // not yet
    }
  }
}
