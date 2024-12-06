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
    let direction = getDirection(lines[i][j], false)
    let res = 1

    while (i !== maxI && j !== maxJ && i !== 0 && j !== 0) {
        if (lines[i + direction.i][j + direction.j] === '#')
            direction = getDirection(lines[i][j], true)
        lines[i][j] = 'X'
        i += direction.i
        j += direction.j
        lines[i][j] = direction.char
    }
    for (let x = 0; lines[x]; x++)
        for (let y = 0; lines[x][y]; y++)
            res += lines[x][y] === 'X' ? 1 : 0

    console.log(res)
}

const mapsAreDifferent = (map1: string[][], map2: string[][]): boolean => {
    for (let i = 0; map1[i]; i++) {
        for (let j = 0; map1[i][j]; j++) {
            if (map1[i][j] !== map2[i][j])
                return true
        }
    }
    return false
}

const task02 = () => {
    const data = readfile('./input')
    const base = data.split('\n').map(line => line.split(''))
    const maxI = base.length - 1
    const maxJ = base[0].length - 1
    let res = 0

    for (let iToBlock = 0; iToBlock <= maxI; iToBlock++) {
        for (let jToBlock = 0; jToBlock <= maxJ; jToBlock++) {
            let { i, j } = getStartingIndex(base)
            let direction = getDirection(base[i][j], false)
            let copy = base.map(line => [...line])
            let mapDiff = base.map(line => [...line])
            let test = 1

            if (arrows.includes(base[iToBlock][jToBlock]) || base[iToBlock][jToBlock] === '#')
                continue
            copy[iToBlock][jToBlock] = 'O'
            mapDiff[iToBlock][jToBlock] = 'O'
            while (true) {
                if (copy[i + direction.i][j + direction.j] === '#' || copy[i + direction.i][j + direction.j] === 'O')
                    direction = getDirection(copy[i][j], true)
                copy[i][j] = 'X'
                if (test % 1000 === 0) {
                    if (!mapsAreDifferent(copy, mapDiff)) {
                        res++
                        break
                    }
                    mapDiff = copy.map(line => [...line])
                }
                i += direction.i
                j += direction.j
                copy[i][j] = direction.char
                if (i === maxI || j === maxJ || i === 0 || j === 0)
                    break
                test++
            }
        }
    }

    // Task02 not working, result is off by something between 30. I don't know exactly

    console.log(res)
}

task01()
task02()