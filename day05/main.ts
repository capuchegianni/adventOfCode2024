import readfile from "../readfile"

const task01 = () => {
    const data = readfile('./input')
    const [pages, updates] = data.split('\n\n')

    const pageList = pages.split('\n').map(page => page.split('|'))
    const updateList = updates.split('\n').map(update => update.split(','))

    const res = updateList.filter(update => {
        return update.every((val, index) => {
            const presentValues = pageList.filter(page => page.includes(val))

            return presentValues.every(page => {
                if (val === page[0]) {
                    if (!update.includes(page[1]))
                        return true
                    return update.indexOf(page[1]) > index
                }
                if (!update.includes(page[0]))
                    return true
                return update.indexOf(page[0]) < index
            })
        })
    }).map(update => Number(update[Math.round(update.length / 2) - 1])).reduce((acc, val) => acc + val, 0)

    console.log(res)
}

const task02 = () => {
    const data = readfile('./input')
    const [pages, updates] = data.split('\n\n')

    const pageList = pages.split('\n').map(page => page.split('|'))
    const updateList = updates.split('\n').map(update => update.split(','))

    const res = updateList.filter(update => {
        return !update.every((val, index) => {
            const presentValues = pageList.filter(page => page.includes(val))

            return presentValues.every(page => {
                if (val === page[0]) {
                    if (!update.includes(page[1]))
                        return true
                    return update.indexOf(page[1]) > index
                }
                if (!update.includes(page[0]))
                    return true
                return update.indexOf(page[0]) < index
            })
        })
    })
    .map(update => Number(update[Math.round(update.length / 2) - 1]))
    .reduce((acc, val) => acc + val, 0)

    // Task not finished, sorting is not done

    console.log(res)
}

task01()
task02()