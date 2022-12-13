import ComandHandler from "./comandHandler.js";

export const router = async (data) => {
    data = data.trim();

    try {
        const [comand, ...rest] = data.split(' ');
        await ComandHandler[comand](rest);

    } catch(err) {
        console.log('Please type valid comand )', err)
    }
    ComandHandler.logPath();
}