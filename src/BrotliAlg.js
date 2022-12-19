import {createReadStream, createWriteStream} from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import path from 'path';

class BrotliAlg {
    #getPath = (arg, flag) =>  {
        const sourсeDir = path.dirname(arg[0]);
        const sourceFile = path.basename(arg[0]);

        const NAME = {
            'compress': `${sourceFile}.br`,
            'decompress': `${sourceFile.replace('.br', '')}`
        }

        let source = '';
        let target = '';
        if (arg.length === 1) {
            source = path.resolve(arg[0]);
            target = path.resolve(process.cwd(), NAME[flag]);
        } else {
            const [soursePath, targetPath] = arg;
            source = path.resolve(soursePath);
            target = path.resolve(targetPath, NAME[flag]);
        }
        return {source, target}

    }

    compress = async(arg) => {
        const {source, target} = this.#getPath(arg, 'compress')
        
        const readStream = createReadStream(source);
        const writeStream = createWriteStream(target);
        const brotliCo = createBrotliCompress();

        readStream.on('error', () => {
            console.log('Wrong path')
        })
        writeStream.on('error', () => {
            console.log('Wrong path')
        })
        brotliCo.on('error', () => {
            console.log('Wrong path')
        })

        const stream = readStream.pipe(brotliCo).pipe(writeStream);

        stream.on('finish', () => {
            console.log('Compressing finished!')
        })
        stream.on('error', (err) => {
            console.log('Smth went wrong!')
        })
    }

    decompress = async(arg) => {
        /*
        const sourсeDir = path.dirname(arg[0]);
        const sourceFile = path.basename(arg[0]);
        let sourse = '';
        let target = '';
        if (arg.length === 1) {
            sourse = path.resolve(arg[0]);
            target = path.resolve(process.cwd(), `${sourceFile.replace('.br', '')}`);
        } else {
            const [soursePath, targetPath] = arg;
            sourse = path.resolve(soursePath);
            target = path.resolve(targetPath, `${sourceFile.replace('.br', '')}`);
        }
        */
        const {source, target} = this.#getPath(arg, 'decompress');
        const readStream = createReadStream(source);
        const writeStream = createWriteStream(target);
        const brotliDe = createBrotliDecompress();

        readStream.on('error', () => {
            console.log('Wrong path!')
        })
        writeStream.on('error', () => {
            console.log('Wrong path')
        })
        brotliDe.on('error', () => {
            console.log('Wrong path')
        })

        const stream = readStream.pipe(brotliDe).pipe(writeStream);
        
        stream.on('error', (err) => {
            console.log('Smth went wrong!')
        })

        stream.on('finish', () => {
            console.log('Decompress finished!')
        })

    }
}

export default new BrotliAlg();