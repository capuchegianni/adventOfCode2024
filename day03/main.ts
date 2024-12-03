import readfile from "../readfile"

const task01 = () => {
    const data = readfile('./input')
    const matches = data.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)
    let res = 0

    for (const match of matches) {
        res += Number(match[1]) * Number(match[2])
    }
    console.log(res)
}

const task02 = () => {
    const data = readfile('./input')
    const matches = data.matchAll(/(do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\))/g)
    let res = 0
    let isEnabled = true

    for (const match of matches) {
        if (match[0] === "do()")
            isEnabled = true;
        if (match[0] === "don't()")
            isEnabled = false;
        if (isEnabled && match[2] && match[3]) {
            res += Number(match[2]) * Number(match[3]);
        }
    }
    console.log(res)
}

task01()
task02()