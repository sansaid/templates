import moment from 'moment';
import { Alarm, createEvents, DateArray, EventAttributes, ReturnObject } from 'ics';

export type Collection = {
    date: string;
    day?: string;
    read_date?: string;
    round?: string;
    schedule?: string;
    service: string;
}

export function validateCollection(c: Collection): boolean {
    if (!("date" in c)) {
        throw new TypeError(`'date' field expected in collection: ${c}`);
    }

    if (!("service" in c)) {
        throw new TypeError(`'service' field expected in collection: ${c}`);
    }

    return true
}

export function collectionDateToDateArray(datetime: string | number[], dateOnly: boolean = false): DateArray {
    let dateMoment: moment.Moment | undefined
    let dateArray: number[]

    const supportedFormats: string[] = [
        "DD/MM/YYYY HH:mm:ss",
        "DD/MM/YYYY HH:mm",
        "DD/MM/YYYY",
        
        "YYYY-MM-DD HH:mm:ss",
        "YYYY-MM-DD HH:mm",
        "YYYY-MM-DD",

        "DD-MM-YYYY HH:mm:ss",
        "DD-MM-YYYY HH:mm",
        "DD-MM-YYYY",
    ]

    if (typeof datetime === "string") {
        supportedFormats.forEach((format) => {
            if (moment(datetime, format, true).isValid()) {
                dateMoment = moment(datetime, format, true)
            }
        })
        
        if (!dateMoment) {
            throw new TypeError(`datetime format not recognised - must be one of: ${supportedFormats}`)
        }

        dateArray = dateMoment.toArray().slice(0, 5)
    } else if (Array.isArray(datetime)) {
        dateArray = datetime.slice(0,5)
    } else {
        throw new TypeError('datetime should be of type string or Date')
    }

    // Because months are 0 based :') https://github.com/moment/moment/issues/2365
    // Also in the docs: https://momentjs.com/docs/#/get-set/month/
    dateArray[1]++

    if (dateOnly) {
        return dateArray.slice(0,3) as DateArray
    }

    return dateArray as DateArray
}

export function collectionToEvent(c: Collection): EventAttributes {
    validateCollection(c)
    

    let todayDateArray: DateArray = collectionDateToDateArray(c.date, true)
    let momentTodayDateArray: DateArray = [...todayDateArray]

    momentTodayDateArray[1]--

    // TODO: this needs tidying - collectionDateToDateArray is doing too many things
    let tomorrowDateArray: number[] = collectionDateToDateArray(moment(momentTodayDateArray).add(1, 'day').toArray(), true)


    let alarms: Array<Alarm> = [{
        action: 'display',
        trigger: {
            before: true,
            hours: 5
        }
    }]

    return {
        start: todayDateArray,
        end: tomorrowDateArray as DateArray,
        productId: 'binboiCollectionReminders',
        title: c.service,
        description: "Time to put the bins out!",
        busyStatus: 'FREE',
        startInputType: 'local',
        startOutputType: 'local',
        endInputType: 'local',
        endOutputType: 'local',
        alarms: alarms,
    }
}

export function collectionsToIcs(collections: Array<Collection>): ReturnObject {
    let events: Array<EventAttributes> = collections.map(collectionToEvent)

    return createEvents(events)
} 