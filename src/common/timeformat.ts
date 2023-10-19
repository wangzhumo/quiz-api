export class TimeFormat {
    static getSTime(date?: Date): number {
        if (!date) {
            return Math.floor(Date.now() / 1000)
        }
        return Math.floor(date.getTime() / 1000)
    }
}
