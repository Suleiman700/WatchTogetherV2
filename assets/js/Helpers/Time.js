
class Time {
    constructor() {}

    // Get time with seconds
    time_with_seconds() {
        const date = new Date()
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        return `${hours}:${minutes}:${seconds}`
    }
}

const Time_C = new Time()
export default Time_C
