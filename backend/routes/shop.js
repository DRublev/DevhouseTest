const express = require('express');
const router = express.Router();

const Shop = require('../db/models/Shop.js');

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

const standartSchedule = new Array(
    {
        day: 'Sun',
        isDayOff: true,
        workTime: {},
        breakTime: new Array()
    },
    {
        day: 'Mon',
        isDayOff: false,
        workTime: {
            start: wTimeStart,
            end: wTimeEnd
        },
        breakTime: new Array({
            start: bTimeStart,
            end: bTimeEnd
        })
    },
    {
        day: 'Tue',
        isDayOff: false,
        workTime: {
            start: wTimeStart,
            end: wTimeEnd
        },
        breakTime: new Array({
            start: bTimeStart,
            end: bTimeEnd
        })
    },
    {
        day: 'Wed',
        isDayOff: false,
        workTime: {
            start: wTimeStart,
            end: wTimeEnd
        },
        breakTime: new Array(
            {
                start: bTimeStart,
                end: bTimeEnd
            })
    },
    {
        day: 'Thu',
        isDayOff: false,
        workTime: {
            start: wTimeStart,
            end: wTimeEnd
        },
        breakTime: new Array({
            start: bTimeStart,
            end: bTimeEnd
        })
    },
    {
        day: 'Fri',
        isDayOff: false,
        workTime: {
            start: wTimeStart,
            end: wTimeEnd
        },
        breakTime: new Array({
            start: bTimeStart,
            end: bTimeEnd
        })
    },
    {
        day: 'Sat',
        isDayOff: true,
        workTime: {},
        breakTime: new Array()
    }
);

router.get('/', (req, res) => {
    Shop.find(req.query).then(
        (data) => {
            res.json({
                status: 200,
                data: {
                    shops: data
                }
            });
        }, (err) => {
            console.log(err);
            res.json({
                status: 904,
                data: {}
            });
        }
    );
});

router.post('/add', (req, res) => {
    let body = req.body;

    let newShop = new Shop({
        name: body.name || 'Default name',
        address: body.address || 'Default address',
        owner: body.owner || '5de679a8cfbaf10348113273',
        schedule: standartSchedule
    });

    newShop.save().then((data) => {
        res.redirect('/shop');
    }, (err) => {
        res.json({
            status: 904,
            data: err
        })
    });
});

router.post('/update', (req, res) => {
    let body = req.body;
    console.log(req);
    Shop.updateOne({ _id: body._id }, {
        name: body.name,
        address: body.address,
        schedule: body.schedule
    }, (err) => {
        console.debug(err);
    });
})

router.delete('/delete', (req, res) => {
    var body = req.body;

    if (!body._id) {
        res.json({ status: 404 });
    }

    Shop.deleteOne({ _id: body._id }, (err) => {
        console.debug(err);
    })
});

module.exports = router;