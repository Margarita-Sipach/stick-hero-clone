export const getRandomNumber = (min: number, max: number, type: 'int' | null = null) => {
    const diff = Math.random() * (max - min)
    return min + (type ? Math.floor(diff) : diff)
}