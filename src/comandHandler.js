import {createReadStream, createWriteStream } from "fs";
import { readdir, writeFile, rename, mkdir} from "fs/promises";
import { rm as remover } from "fs/promises";
import path from "path";
import os, { EOL } from "os";
import SystemInfo from "./SystemInfo.js";
import CalcHash from "./calcHash.js";
import BrotliAlg from "./BrotliAlg.js";
import { fileURLToPath } from "url";
import { Transform } from "stream";
import { Console } from "console";


class ComandHandler {
    go = () => {
        const target = process.argv[1].split(`${path.sep}`);
        target.pop();
        process.chdir(path.join(...target))
    }
    help = async ([arg]) => {
        const dirName = path.dirname(fileURLToPath(import.meta.url));
        const fileInfo = path.resolve(dirName, 'helpInfo', 'helpInfo.txt');
        const read = createReadStream(fileInfo);

        if (arg) {
            const findInfo = new Transform({
                transform(chunk, encoding, callback) {
                    let returnValue = chunk.toString().split('\r\n');
                    returnValue = returnValue.filter(item => {
                        return item.startsWith(arg)
                     }).join('\n') + EOL;
                    
                    if (returnValue === "\r\n") {
                        returnValue = 'Try use help with rigth arguments'
                    }

                    callback(null, returnValue)
                }
            });
            read.pipe(findInfo).pipe(process.stdout)
            
        } else {
            read.pipe(process.stdout);
        }     
    }

    start = () => {
        process.chdir(os.homedir())
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
            result.sort(function(a, b) {
                if (a.Type < b.Type) {
                    return -1
                }
                if (a.Type > b.Type) {
                    return 1
                }
                return a.name - b.name
                
            })

            console.table(result);

        } catch(err) {
            console.log(err)
        }
    }
    //Basic operations with files
    cat = async ([path]) => {
        const readable = createReadStream(path, {encoding: 'utf8'});
        
        readable.on('error', () => {
            console.log('Can\'t read')
        })

        readable.pipe(process.stdout);

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
        const [sourсe, target] = array;

        try {
            const pathToTarget = path.resolve(target, sourсe)
           
            const readStream = createReadStream(sourсe);

            readStream.on('error', (err) => {
                console.log('Can\'t read!');
                readStream.destroy()
            })

            await mkdir(target, {recursive: true});
            await writeFile(pathToTarget, '', {flag: 'wx'});

            const writeStream = createWriteStream(pathToTarget);
            
            readStream
            .pipe(writeStream)
            .on('error', (err) => {
                console.log('Smth wrong!')
            });
            
            console.log(`Where is the ${sourсe}? It is in ${target}!`)
        } catch(err) {
            console.log('Try better!')
        }
    }

    mv = async (array) => {
        const [source, target] = array;
        const sourсeDir = path.dirname(source);
        const sourceFile = path.basename(source);
        try {
            const pathToFile = path.resolve(target, sourceFile);
            
            const readStream = createReadStream(source);

            readStream.on('error', (err) => {
                console.log('Can\'t find sourse. Try rigth path');
                readStream.destroy()
            })

            await mkdir(target, {recursive: true});
            await writeFile(pathToFile, '', {flag: 'wx'});
           
            
            const writeStream = createWriteStream(pathToFile);
            
            readStream
            .pipe(writeStream)
            .on('error', (err) => {
                console.log('Smth wrong!')
            });
            await remover(source, {recursive: true});
            console.log('File was moved')

        }catch(err) {
            console.log("bad News")
        }
    }

    rm = async([path]) => {
        try {
            await remover(path, {recursive: true});
            console.log(`You\`l never see ${path} again!`);
        } catch(err) {
            console.log('Smth went wrong!', err)
        }
    }
    //Operating system info
    os = async([arg]) => {
        if (arg.startsWith('--')) {
            const param = arg.replace('--', '');
            if (SystemInfo.hasOwnProperty(param)) {
                SystemInfo[param]();
            } else {
                console.log('Print relevant arg')
                return
            }

        } else {
            console.log('Print relevant arg')
            return
        };
    }
    //Calc hash
    hash = async([arg]) => {
        const result = CalcHash(arg);
        console.log(result)
    }
    //Compress, decompress
    compress = async(array) => {
        BrotliAlg.compress(array);
    }
    decompress = async(array) => {
        BrotliAlg.decompress(array)        
    }

};

export default new ComandHandler();