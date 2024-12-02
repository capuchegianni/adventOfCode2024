import readfile from '../readfile'

const isIncreasing = (nums: number[], index: number) => {
    if (index >= nums.length - 1)
        return true

    const diff = Math.abs(nums[index + 1] - nums[index])

    if (diff > 3 || diff < 1)
        return false
    if (nums[index] < nums[index + 1])
        return isIncreasing(nums, index + 1)
    return false
}

const isDecreasing = (nums: number[], index: number) => {
    if (index >= nums.length - 1)
        return true

    const diff = Math.abs(nums[index + 1] - nums[index])

    if (diff > 3 || diff < 1)
        return false
    if (nums[index] > nums[index + 1])
        return isDecreasing(nums, index + 1)
    return false
}

const task01 = () => {
    const data = readfile('./input')
    const lines = data.split('\n')

    const res = lines.reduce((acc, line) => {
        const numbers = line.split(' ').map(num => Number(num))

        if (numbers[0] > numbers[1]) {
            if (isDecreasing(numbers, 0)) {
                console.log(numbers.join(' '))
                return acc + 1
            }
        } else {
            if (isIncreasing(numbers, 0)) {
                console.log(numbers.join(' '))
                return acc + 1
            }
        }
        return acc
    }, 0)

    console.log(res)
}

task01()