import { statSync, accessSync } from "fs";
import { readdir, writeFile } from "fs/promises";
import path from "path";

class ComandHandler {

    #getPath = (soursePath) => {
        const pathArray = soursePath.split(path.sep);
        console.log('from getPath', ...pathArray, path.resolve(...pathArray) )
        return path.relative(path.resolve(), path.resolve(...pathArray));
    }
    logPath = () => {
        console.log('Now You are in: ', process.cwd());
    }

    up = () => {
        this.cd(['../']);
    }

    cd = async ([path]) => {
        const pathToDir = this.#getPath(path);
        console.log('console from cd', path, 'path', pathToDir);
        try {
            process.chdir(pathToDir);
            console.log('Dir changed sucсessfully!');
        } catch(err) {
            console.log('Wrong path, try again');
        }
    }

    ls = async () => {
        try {
            const listEntries = await readdir(process.cwd());
            
            listEntries.sort()
                .map(file => {
                    let Type;
                    try {
                        accessSync(file)
                        Type = statSync(file).isDirectory() ? 'directory' : 'file';
                    } catch {
                        Type = '--no access--'
                    }
                    
                    const string =  {
                        Name: file,
                        Type
                    };
                    
                return string;
            });
            console.table(listEntries);
        } catch(err) {
            console.log(err)
        }
        
    }

    add = async ([path]) => {

        const pathToFile = this.#getPath(path);
        
        try {
            await writeFile(pathToFile, '', {flag: 'wx'});
            console.log('File created sucсessfully!');
        } catch(err) {
            console.log('Wrong path, try again');
            }
    }

};

export default new ComandHandler();