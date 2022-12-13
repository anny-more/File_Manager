import { readdir, writeFile } from "fs/promises";
import path from "path";

class ComandHandler {

   /* #getPath = (soursePath) => {
        const pathArray = soursePath.split(path.sep);
        return path.relative(path.resolve(), path.resolve(...pathArray));
    }*/
    logPath = () => {
        console.log('Now You are in: ', process.cwd());
    }

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