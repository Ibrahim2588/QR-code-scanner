export const formatDate = (_date) => {
    const date = new Date(_date)

    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    return {
        date: `${day}/${month}/${year}`,
        time: `${hour}:${minutes}:${seconds}`,
    }
}
