import ComandHandler from "./ComandHandler.js";

export const router = async (data) => {
    data = data.trim();

    try {
        const arrayFromData = data.split(' ').filter(item => item !== '');
        const [comand, ...rest] = arrayFromData;
        await ComandHandler[comand](rest);

    } catch(err) {
        console.log('Please type valid comand )')
    }

};
