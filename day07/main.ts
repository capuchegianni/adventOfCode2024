import readfile from "../readfile"

const generateExpressions = (numbers: number[], firstTask: boolean): number[] => {
    const results: number[] = []

    const helper = (index: number, currentValue: number) => {
        if (index === numbers.length) {
            results.push(currentValue)
            return
        }

        const nextNumber = numbers[index]

        helper(index + 1, currentValue + nextNumber)
        helper(index + 1, currentValue * nextNumber)
        if (!firstTask)
            helper(index + 1, Number(currentValue.toString() + nextNumber.toString()))
    }

    if (numbers.length === 0)
        return results
    helper(1, numbers[0])
    return results
}

const task01 = () => {
    const data = readfile('./input')
    const lines = data.split('\n').map(line => {
        const [res, values] = line.split(': ')

        return [Number(res), ...values.split(' ').map(value => Number(value))]
    })
    const res = lines.reduce((acc, line) => {
        const [targetRes, ...values] = line
        const possibleResults = generateExpressions(values, true)

        if (possibleResults.includes(targetRes))
            return acc + targetRes
        return acc
    }, 0)

    console.log(res)
}

const task02 = () => {
    const data = readfile('./input')
    const lines = data.split('\n').map(line => {
        const [res, values] = line.split(': ')

        return [Number(res), ...values.split(' ').map(value => Number(value))]
    })
    const res = lines.reduce((acc, line) => {
        const [targetRes, ...values] = line
        const possibleResults = generateExpressions(values, false)

        if (possibleResults.includes(targetRes))
            return acc + targetRes
        return acc
    }, 0)

    console.log(res)
}

task01()
task02()