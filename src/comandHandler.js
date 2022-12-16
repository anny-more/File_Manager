import {existsSync, createReadStream, createWriteStream } from "fs";
import { readdir, writeFile, rename, mkdir} from "fs/promises";
import { rm as remoover } from "fs/promises";
import path, { resolve } from "path";
import os from 'os';
import SystemInfo from "./SystemInfo.js";


class ComandHandler {
    #getPath = (soursePath) => {
        const pathArray = soursePath.split(path.sep);
        console.log('from getPath', ...pathArray, path.resolve(...pathArray) )
        return path.relative(path.resolve(), path.resolve(...pathArray));
    }

    logPath = () => {
        console.log('Now You are in: ', process.cwd());
    }
    //Navigation & working directory

    up = () => {
        this.cd(['../']);
    }

    cd = async ([path]) => {
        try {
            process.chdir(path);
            console.log('Dir changed sucсessfully!');
        } catch(err) {
            console.log('Wrong path, try again');
        }
    }

    ls = async () => {
        try {
            const listEntries = await readdir(process.cwd(), {withFileTypes: true});
            const result = [];
            listEntries
                .forEach(file => {
                    let Type;
                        if (file.isDirectory()) {
                            Type = 'directory'
                        } else if (file.isFile()) {
                            Type = 'file'
                        } else {
                            Type = '--unknown--'
                        }
                    const string =  {
                        Name: file.name,
                        Type
                    };
                result.push(string);
            });

            console.table(result);

        } catch(err) {
            console.log(err)
        }
    }
    //Basic operations with files
    cat = async ([path]) => {

        if (existsSync(path)) {
            const readable = createReadStream(path, {encoding: 'utf8'});
            readable.pipe(process.stdout);
        
        } else {
            console.log('Smth wrong with path')
        }
    }

    add = async ([path]) => {
        
        try {
            await writeFile(path, '', {flag: 'wx'});
            console.log('File created sucсessfully!');
        } catch(err) {
            console.log('Wrong path, try again');
            }
    }
    rn = async(array) => {
        const [sourse, target] = array;
        try {
            await rename(sourse, target);
            console.log(`${sourse} now is ${target}`)
        } catch(err) {
            console.log('Try better!')
        }

    }
    
    cp = async(array) => {
        const [sourse, target] = array;

        try {
            const pathToTarget = path.resolve(target, sourse)
            await mkdir(target, {recursive: true});
            await writeFile(pathToTarget, '', {flag: 'wx'});
            const writeStream = createWriteStream(pathToTarget);
            
            createReadStream(sourse).pipe(writeStream);
            
            console.log(`Where is the ${sourse}? It is in ${target}!`)
        } catch(err) {
            console.log('Try better!', err)
        }
    }

    mv = async (array) => {
        const [source, target] = array;
            try {
                const pathToFile = path.resolve(target, source);
                await mkdir(target, {recursive: true});
                await writeFile(pathToFile, '', {flag: 'wx'});
           
                const readStream = createReadStream(source);
                const writeStream = createWriteStream(pathToFile);
                readStream.pipe(writeStream)
                .on(err => {
                    console.log('Smth goes wrong!')
                });
                await remoover(source, {recursive: true});
        }catch(err) {
            console.log("bad News")
        } 
    }

    rm = async([path]) => {
        try {
            await remoover(path, {recursive: true});
            console.log(`You\`l never see ${path} again!`);
        } catch(err) {
            console.log('Smth went wrong!'. err)
        }
    }
    //Operating system info
    os = async([arg]) => {
        if (arg.startsWith('--')) {
            const param = arg.replace('--', '');
            SystemInfo[param]();
        } else {
            console.log('Print relevant arg')
            return
        };
    }
};

export default new ComandHandler();