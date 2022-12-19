import ComandHandler from "./ComandHandler.js";
import getValidArgs from "./getValidArgs.js";

export const router = async (data) => {

    try {
        const [comand, ...rest] = getValidArgs(data);
        await ComandHandler[comand](rest);

    } catch(err) {
        console.log('Please type valid comand )')
    }

};
