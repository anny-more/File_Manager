import {createHash} from "crypto";
import { readFile } from "node:fs/promises";

const calculateHash = async (pathToFile) => {
    const target = pathToFile;

    try {
        const content = await readFile(target);
        const hash = createHash('sha256');
        return `Hash is ${hash.update(content).digest('hex')}`;
    } catch(err) {
        return'I can\'t calculate hash'
    }
};
export default calculateHash();