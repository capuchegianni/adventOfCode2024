import readfile from "../readfile"

const arrows = ['^', '>', 'v', '<']
const directions = [
    { char: '^', i: -1, j: 0 },
    { char: '>', i: 0, j: 1 },
    { char: 'v', i: 1, j: 0 },
    { char: '<', i: 0, j: -1 }
]

const getStartingIndex = (lines: string[][]): { i: number, j: number } => {
    for (let i = 0; lines[i]; i++) {
        for (let j = 0; lines[i][j]; j++) {
            if (arrows.includes(lines[i][j]))
                return { i, j }
        }
    }
    return { i: 0, j: 0 }
}

const getDirection = (char: string, next: boolean): { char: string, i: number, j: number } => {
    if (next) {
        const index = directions.findIndex(direction => direction.char === char)

        return directions[index === directions.length - 1 ? 0 : index + 1]
    }
    return directions[directions.findIndex(direction => direction.char === char)]
}

const task01 = () => {
    const data = readfile('./input')
    const lines = data.split('\n').map(line => line.split(''))
    const maxI = lines.length - 1
    const maxJ = lines[0].length - 1
    let { i, j } = getStartingIndex(lines)
    let hasEnded = false
    let direction = getDirection(lines[i][j], false)
    let res = 0

    while (!hasEnded) {
        if (lines[i + direction.i][j + direction.j] === '#')
            direction = getDirection(lines[i][j], true)
        lines[i][j] = 'X'
        i += direction.i
        j += direction.j
        lines[i][j] = direction.char
        if (i === maxI || j === maxJ)
            break
    }
    for (let x = 0; lines[x]; x++)
        for (let y = 0; lines[x][y]; y++)
            res += lines[x][y] === 'X' ? 1 : 0

    console.log(res + 1)
}

task01()