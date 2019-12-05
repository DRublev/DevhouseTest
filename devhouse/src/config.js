
let wTimeStart = new Date();
wTimeStart.setHours(8);
wTimeStart.setMinutes(0);
let wTimeEnd = new Date();
wTimeEnd.setHours(18);
wTimeEnd.setMinutes(0);

let bTimeStart = new Date();
bTimeStart.setHours(13);
bTimeStart.setMinutes(0);
let bTimeEnd = new Date();
bTimeEnd.setHours(14);
bTimeEnd.setMinutes(0);

module.exports = {
    Backend: 'http://localhost:5100/',
    defaultShopSchedule: [
        {
            day: 'Sun',
            isDayOff: true,
            workTime: {},
            breakTime: []
        },
        {
            day: 'Mon',
            isDayOff: false,
            workTime: {
                start: wTimeStart,
                end: wTimeEnd
            },
            breakTime: [{
                start: bTimeStart,
                end: bTimeEnd
            }]
        },
        {
            day: 'Tue',
            isDayOff: false,
            workTime: {
                start: wTimeStart,
                end: wTimeEnd
            },
            breakTime: [{
                start: bTimeStart,
                end: bTimeEnd
            }]
        },
        {
            day: 'Wed',
            isDayOff: false,
            workTime: {
                start: wTimeStart,
                end: wTimeEnd
            },
            breakTime: [
                {
                    start: bTimeStart,
                    end: bTimeEnd
                }]
        },
        {
            day: 'Thu',
            isDayOff: false,
            workTime: {
                start: wTimeStart,
                end: wTimeEnd
            },
            breakTime: [{
                start: bTimeStart,
                end: bTimeEnd
            }]
        },
        {
            day: 'Fri',
            isDayOff: false,
            workTime: {
                start: wTimeStart,
                end: wTimeEnd
            },
            breakTime: [{
                start: bTimeStart,
                end: bTimeEnd
            }]
        },
        {
            day: 'Sat',
            isDayOff: true,
            workTime: {},
            breakTime: []
        }
    ],
};