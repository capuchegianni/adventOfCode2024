import readfile from "../readfile"

const chars = ['X', 'M', 'A', 'S']
const directions = [
    { x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 },
    { x: 0, y: -1 }, { x: 0, y: 1 },
    { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }
]

const propagate = (data: string[], charIndex: number, way: { x: number, y: number }, pos: { x: number, y: number }): number => {
    if (pos.x + way.x < 0 || pos.x + way.x >= data.length || pos.y + way.y < 0 || pos.y + way.y >= data[0].length)
        return 0;
    if (data[pos.x + way.x][pos.y + way.y] !== chars[charIndex])
        return 0
    if (charIndex === chars.length - 1)
        return 1
    return propagate(data, charIndex + 1, way, { x: pos.x + way.x, y: pos.y + way.y })
}

const task01 = () => {
    const data = readfile('./input').split('\r\n')
    let res = 0

    data.forEach((line, x) => {
        line.split('').forEach((char, y) => {
            if (char === 'X') {
                directions.forEach(way => {
                    res += propagate(data, 1, way, { x, y })
                })
            }
        })
    })

    console.log(res)
}

task01()