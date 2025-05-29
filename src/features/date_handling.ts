export function addOneDay(currentDate: number):Date {
    const result = new Date(currentDate)
    result.setUTCDate(result.getUTCDate() + 1)
    return result
}