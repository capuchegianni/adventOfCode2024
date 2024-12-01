import readFile from '../readfile'

const task01 = () => {
    const data = readFile('./input')
    const lines = data.split('\n')
    const left = lines.map(line => Number(line.split('  ')[0])).sort((a, b) => a - b)
    const right = lines.map(line => Number(line.split('  ')[1])).sort((a, b) => a - b)
    const res = lines.map((_, index) => ({
        one: left[index],
        two: right[index]
    })).map(nums => Math.abs(nums.one - nums.two)).reduce((acc, val) => acc + val, 0)

    console.log(res)
}

const task02 = () => {
    const data = readFile('./input')
    const lines = data.split('\n')
    const left = lines.map(line => ({
        num: Number(line.split('  ')[0]),
        appearances: 0
    }))
    const right = lines.map(line => Number(line.split('  ')[1]))
    left.forEach(data => {
        data.appearances = right.filter(num => num === data.num).length
    })
    const res = left.reduce((acc, val) => acc + val.num * val.appearances, 0)

    console.log(res)
}

task01()
task02()