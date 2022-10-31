export const isUrl = (text = '') => {

    const matchers = [
        '.com',
        '.net',
        '.org',
    ]

    matchers.map((match)=> {
        text.includes(match)
    })

    if (text.includes('http') || text.includes('.com')) {
        return true
    }
}
