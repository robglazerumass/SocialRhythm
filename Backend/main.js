import * as readline from "node:readline/promises";
import { stdin, stdout } from "node:process";


console.log("Type 'quit' to exit.");

const rl = readline.createInterface({ input: stdin, output: stdout });

while (true) {
    const input = await rl.question("> ");
    let trimmed = input.replace(/\s/g, "");
    console.log(input);
    if (trimmed == "quit") {
        break;
    }
}

rl.close();

console.log("program completed.");