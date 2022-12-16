import os from 'os';


class SystemInfo {
    EOL = () => {
        const marker = JSON.stringify(`${EOL}`);
        console.log('The operating system-specific end-of-line marker is ', marker)
    }
    cpus = () => {
        console.log(`There is ${os.cpus().length} CPUs`);
        os.cpus().forEach((item, index) => {
            console.log(`CPU${index + 1}: model is ${item.model}, clock rate is ${item.speed/1000}GHz`);
        })
    }
    homedir = () => {
        const homedir = os.homedir();
        console.log('The current user\'s home directory is ', homedir);
    }
    username = () => { 
        const username = os.userInfo({encoding: 'utf8'});
        console.log('Current system user name is', username.username)
        
    }
    architecture = () => {
        const marker = os.arch();
        console.log('operating system CPU architecture is ', marker);        
    }
}
export default new SystemInfo();