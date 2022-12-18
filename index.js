import readline from "node:readline";
import TalkWithUser from "./src/talkWithUser.js";
import { router } from "./src/router.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

rl.on('line', (line) => {

    if (line.startsWith('.exit')) {
        TalkWithUser.sayBye();
        process.exit()
    }
  
    router(line.toString())
    .finally(() => {
        TalkWithUser.sayWorkingDir()
    })
    
}).on('close', () => {
    TalkWithUser.sayBye();
});

process.nextTick(() => {
    TalkWithUser.sayHi();
    router('start');
    TalkWithUser.sayWorkingDir()
});