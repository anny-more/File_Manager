import readline from "node:readline";
import TalkWithUser from "./src/talkWithUser.js";
import { router } from "./src/router.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    promt: '>>'
  });

rl.on('line', (line) => {

    if (line.startsWith('.exit')) {
        TalkWithUser.sayBye();
        process.exit()
    }

    router(line.toString());
    rl.promt;

}).on('close', () => {
    TalkWithUser.sayBye();
});

process.nextTick(() => TalkWithUser.sayHi());

//os.homedir()
