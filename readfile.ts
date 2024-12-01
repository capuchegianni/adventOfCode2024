import fs from 'fs'

const readfile = (filename: string): string => {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        return data;
    } catch (err) {
        console.log(err)
        return "";
    }
}

export default readfile