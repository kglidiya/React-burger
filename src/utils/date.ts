export function formatDate(d: string) {
    const moment = require('moment');
    require('moment/locale/ru');
    const date = new Date( Date.parse(d))
    const timeZone = new Intl.DateTimeFormat("ru", {timeZoneName: "short"}).format(date)
    const day = moment(d).calendar()
    return `${day} i-${timeZone.slice(timeZone.indexOf(',') + 2)}`
 }