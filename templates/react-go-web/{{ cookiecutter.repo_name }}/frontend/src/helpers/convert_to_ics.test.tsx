import { Alarm, EventAttributes } from 'ics'
import { Collection, 
    collectionDateToDateArray, 
    collectionToEvent, 
    collectionsToIcs, 
    validateCollection } from "./convert_to_ics";

function extractCaptureGroups(iterable: IterableIterator<RegExpMatchArray>): string[] {
    let regexpArray: Array<RegExpMatchArray> = Array.from(iterable)
    
    // The capture groups will always be between the first element and last 3 elements 
    // of a RegExpMatchArray. We can slice towards the end here, because the slice
    // function automatically excludes the last 3 elements in the RegExpMatchArray
    // since they're not standard JS array elements.
    return regexpArray.map(x => x.slice(1,)).flat(1)
}

describe('validateCollection', () => {
    test('passing valid collection', () => {
        const collection = {
            date: '2022-12-30 22:40',
            service: 'cholula'
        }
        
        expect(validateCollection(collection)).toBe(true)
    })
})

describe('collectionDateToDateArray', () => {
    test('passing invalid date type as string', () => {
        expect(() => { collectionDateToDateArray('abc') }).toThrow(/datetime format not recognised/);
    });

    test('passing out of range date type as string', () => {
        expect(() => { collectionDateToDateArray('43/13/2021') }).toThrow(/datetime format not recognised/);
    });

    test('passing valid date type in YYYY-MM-DD HH:MM string format', () => {
        expect(collectionDateToDateArray('2022-05-10 22:30')).toEqual([2022, 5, 10, 22, 30]);
    });

    test('passing valid date type in YYYY-MM-DD HH:MM:SS string format', () => {
        expect(collectionDateToDateArray('2022-05-10 22:30:58')).toEqual([2022, 5, 10, 22, 30]);
    });

    test('passing valid date type in DD/MM/YYYY string (i.e. without time in format)', () => {
        expect(collectionDateToDateArray('28/12/2022')).toEqual([2022, 12, 28, 0, 0]);
    });

    test('passing valid date type in DD/MM/YYYY HH:MM string format', () => {
        expect(collectionDateToDateArray('28/12/2022 22:50')).toEqual([2022, 12, 28, 22, 50]);
    });

    test('passing valid date type in DD/MM/YYYY HH:MM with dateOnly enabled', () => {
        expect(collectionDateToDateArray('28/12/2022 22:50', true)).toEqual([2022, 12, 28]);
    });

    test('passing valid date type in DD-MM-YYYY HH:MM string', () => {
        expect(collectionDateToDateArray('28-12-2022 22:50')).toEqual([2022, 12, 28, 22, 50]);
    });

    test('passing valid date type in DD-MM-YYYY string with dateOnly enabled', () => {
        expect(collectionDateToDateArray('28-12-2022', true)).toEqual([2022, 12, 28]);
    });
});

describe('collectionToEvent', () => {
    const alarms: Array<Alarm> = [{
        action: 'display',
        trigger: {
            before: true,
            hours: 5
        }
    }]
    
    test('passing valid collection', () => {
        const collection: Collection = {
            date: "2022-12-31 23:40",
            service: "Collect yo Cholula"
        }

        const expectedEvent: EventAttributes = {
            start: [2022, 12, 31],
            end: [2023, 1, 1],
            productId: "binboiCollectionReminders",
            title: "Collect yo Cholula",
            description: "Time to put the bins out!",
            busyStatus: 'FREE',
            startInputType: 'local',
            startOutputType: 'local',
            endInputType: 'local',
            endOutputType: 'local',
            alarms: alarms,
        }

        expect(collectionToEvent(collection)).toEqual(expectedEvent)
    })
});


describe('collectionsToIcs', () => {
    test('passing list of valid collections', () => {
        const collections: Array<Collection> = [
            {
                date: "2022-12-31 23:40",
                service: "Collect yo Cholula"
            },
            {
                date: "2023-01-04 23:40",
                service: "Collect yo Pikachu"
            }
        ]

        const eventMatchers = [
            {
                eventPatterns: [
                    'SUMMARY:Collect yo Cholula', 
                    'DTSTART;VALUE=DATE:20221231', 
                    'DTEND;VALUE=DATE:20230101',
                    'DESCRIPTION:Time to put the bins out!',
                    'X-MICROSOFT-CDO-BUSYSTATUS:FREE'
                ],
                alarmPatterns: [
                    'ACTION:DISPLAY',
                    'TRIGGER:-PT5H'
                ]
            },{
                eventPatterns: [
                    'SUMMARY:Collect yo Pikachu', 
                    'DTSTART;VALUE=DATE:20230104', 
                    'DTEND;VALUE=DATE:20230105',
                    'DESCRIPTION:Time to put the bins out!',
                    'X-MICROSOFT-CDO-BUSYSTATUS:FREE'
                ],
                alarmPatterns: [
                    'ACTION:DISPLAY',
                    'TRIGGER:-PT5H'
                ]
            }
        ]
        
        const metaCapture = /BEGIN\:VCALENDAR([\w\W\r\n]*?)BEGIN\:VEVENT/g
        const eventCapture = /BEGIN\:VEVENT([\w\W\r\n]*?)END\:VEVENT/g
        const alarmCapture = /BEGIN\:VALARM([\w\W\r\n]*?)END\:VALARM/g

        const calEntries = collectionsToIcs(collections)

        expect(calEntries.error!).toBeNull
        expect(calEntries.value!).toBeDefined

        const meta: string[] = extractCaptureGroups(calEntries.value!.matchAll(metaCapture))
        const events: string[] = extractCaptureGroups(calEntries.value!.matchAll(eventCapture))

        meta.forEach(m => expect(m).toContain('PRODID:binboiCollectionReminders'))

        events.forEach((event, ie) => {
            eventMatchers[ie].eventPatterns.forEach((pattern) => {
                expect(event).toContain(pattern)
            })

            let alarms: string[] = extractCaptureGroups(event.matchAll(alarmCapture))

            alarms.forEach((alarm) => {
                eventMatchers[ie].alarmPatterns.forEach((pattern) => {
                    expect(alarm).toContain(pattern)
                })
            })
        })
    })
});