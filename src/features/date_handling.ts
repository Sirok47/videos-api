const oneDay: number = 1000 * 24 * 60 * 60

function addOneDay(currentDate: Date):Date {
    return new Date(new Date().setDate(currentDate.getDate() + oneDay))
}