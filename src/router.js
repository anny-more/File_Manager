import ComandHandler from "./comandHandler.js";

export const router = async (data) => {
    data = data.trim();

    try {
        const arrayFromData = data.split(' ');
        const [comand, ...rest] = arrayFromData;
       // console.log('console from router, comand = ', comand, 'rest = ', rest)
        await ComandHandler[comand](rest);

    } catch(err) {
        console.log('Please type valid comand )', err)
    }
    ComandHandler.logPath();
}