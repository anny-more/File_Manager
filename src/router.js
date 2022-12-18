import ComandHandler from "./ComandHandler.js";

export const router = async (data) => {
    data = data.trim();

    try {
        const arrayFromData = data.split(' ').filter(item => item !== ' ');
        const [comand, ...rest] = arrayFromData;
        //console.log('console from router, comand = ', comand, 'rest = ', rest)
        await ComandHandler[comand](rest);

    } catch(err) {
        console.log('Please type valid comand )', err)
    }

};
/*
to do handle with paths
create obj {
    sourseFile: null;
    sourseDir: null;
    targetFile: null;
    targetDir: null;
}
*/