import {EOL} from "node:os";

class TalkWithUser {
    constructor() {
        this.userName = this.getUserName() || 'Friend';
    }

    getUserName = () => {
        try {
            let [name] = process.argv.slice(2);
            name = name.replace('--username=', '').trim();
            name.split('').map((index, letter) => index === 0 ? letter.toUpperCase() : letter).join('');
            return name;
        } catch {} 
    }
    
    sayHi = () => {
        console.log(`Welcome to the File Manager, ${this.userName}!`);
    }
    
    sayBye = () => {
        console.log(`${EOL}Thank you for using File Manager, ${this.userName}, goodbye!`);
    }
}

export default new TalkWithUser();