import {createReadStream, createWriteStream} from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import path from 'path';

class BrotliAlg {
    #getpath = (arg) => {
        return path.resolve(arg)
    }

    compress = async(arg) => {
        let sourse = '';
        let target = '';
        if (arg.length === 1) {
            sourse = this.#getpath(arg[0]);
            target = path.resolve(process.cwd(), `${arg[0]}.br`);
        } else {
            const [soursePath, targetPath] = arg;
            sourse = this.#getpath(soursePath);
            target = this.#getpath(targetPath);
        }
        const readStream = createReadStream(sourse);
        const writeStream = createWriteStream(target);
        const brotliCo = createBrotliCompress();

        const stream = readStream.pipe(brotliCo).pipe(writeStream);

        stream.on('finish', () => {
            console.log('Compressing finished!')
        })
        stream.on('error', (err) => {
            console.log('Smth went wrong!', err)
        })
    }

    decompress = async(arg) => {
        let sourse = '';
        let target = '';
        if (arg.length === 1) {
            sourse = this.#getpath(arg[0]);
            target = path.resolve(process.cwd(), `${arg[0].replace('.br', '')}`);
        } else {
            const [soursePath, targetPath] = arg;
            sourse = this.#getpath(soursePath);
            target = this.#getpath(targetPath);
        }
        /*
        const sourse = this.#getpath(soursePath);
        const target = this.#getpath(targetPath);
        */

        const readStream = createReadStream(sourse);
        const writeStream = createWriteStream(target);
        const brotliDe = createBrotliDecompress();

        const stream = readStream.pipe(brotliDe).pipe(writeStream);
        
        stream.on('error', (err) => {
            console.log('Smth went wrong!', err)
        })

        stream.on('finish', () => {
            console.log('Decompress finished!')
        })

    }
}

export default new BrotliAlg();