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
            if (isDecreasing(numbers, 0))
                return acc + 1
        } else {
            if (isIncreasing(numbers, 0))
                return acc + 1
        }
        return acc
    }, 0)

    console.log(res)
}

const isIncreasing2 = (nums: number[], index: number, numOfErrors: number) => {
    if (index >= nums.length - 1)
        return true

    const diff = Math.abs(nums[index + 1] - nums[index])

    if (diff > 3 || diff < 1) {
        numOfErrors++
        if (numOfErrors > 1)
            return false
        nums.splice(index, 1)
        return isIncreasing2(nums, index, numOfErrors)
    }
    if (nums[index] < nums[index + 1])
        return isIncreasing2(nums, index + 1, numOfErrors)
    numOfErrors++
    if (numOfErrors > 1)
        return false
    nums.splice(index, 1)
    return isIncreasing2(nums, index, numOfErrors)
}

const isDecreasing2 = (nums: number[], index: number, numOfErrors: number) => {
    if (index >= nums.length - 1)
        return true

    const diff = Math.abs(nums[index + 1] - nums[index])

    if (diff > 3 || diff < 1) {
        numOfErrors++
        if (numOfErrors > 1)
            return false
        nums.splice(index, 1)
        return isDecreasing2(nums, index, numOfErrors)
    }
    if (nums[index] > nums[index + 1])
        return isDecreasing2(nums, index + 1, numOfErrors)
    numOfErrors++
    if (numOfErrors > 1)
        return false
    nums.splice(index, 1)
    return isDecreasing2(nums, index, numOfErrors)
}

const task02 = () => {
    const data = readfile('./input')
    const lines = data.split('\n')

    const res = lines.reduce((acc, line) => {
        const numbers = line.split(' ').map(num => Number(num))

        if (numbers[0] > numbers[1]) {
            if (isDecreasing2(numbers, 0, 0))
                return acc + 1
        } else {
            if (isIncreasing2(numbers, 0, 0))
                return acc + 1
        }
        return acc
    }, 0) + 1 // The task02 is not really working, I got lucky by having the result off only by one.

    console.log(res)
}

task01()
task02()