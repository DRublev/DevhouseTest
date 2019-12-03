const express = require('express');
const router = express.Router();

const Shop = require('../db/models/Shop.js');

const standartSchedule = new Array(
    {
        day: 'Sun',
        isDayOff: true,
        workTime: [],
        breakTime: []
    },
    {
        day: 'Mon',
        isDayOff: false,
        workTime: [{
            start: {
                hours: 9,
                minutes: 0,
            },
            end: {
                hours: 18,
                minutes: 0
            }
        }],
        breakTime: [{
            start: {
                hours: 13,
                minutes: 0
            },
            end: {
                hours: 14,
                minutes: 0
            }
        }]
    },
    {
        day: 'Tue',
        isDayOff: false,
        workTime: [{
            start: {
                hours: 9,
                minutes: 0,
            },
            end: {
                hours: 18,
                minutes: 0
            }
        }],
        breakTime: [{
            start: {
                hours: 13,
                minutes: 0
            },
            end: {
                hours: 14,
                minutes: 0
            }
        }]
    },
    {
        day: 'Wed',
        isDayOff: false,
        workTime: [{
            start: {
                hours: 9,
                minutes: 0,
            },
            end: {
                hours: 18,
                minutes: 0
            }
        }],
        breakTime: [{
            start: {
                hours: 13,
                minutes: 0
            },
            end: {
                hours: 14,
                minutes: 0
            }
        },
        {
            start: {
                hours: 16,
                minutes: 0
            },
            end: {
                hours: 16,
                minutes: 25
            }
        }]
    },
    {
        day: 'Thu',
        isDayOff: false,
        workTime: [{
            start: {
                hours: 9,
                minutes: 0,
            },
            end: {
                hours: 18,
                minutes: 0
            }
        }],
        breakTime: [{
            start: {
                hours: 13,
                minutes: 0
            },
            end: {
                hours: 14,
                minutes: 0
            }
        }]
    },
    {
        day: 'Fri',
        isDayOff: false,
        workTime: [{
            start: {
                hours: 9,
                minutes: 0,
            },
            end: {
                hours: 18,
                minutes: 0
            }
        }],
        breakTime: [{
            start: {
                hours: 13,
                minutes: 0
            },
            end: {
                hours: 14,
                minutes: 0
            }
        }]
    },
    {
        day: 'Sat',
        isDayOff: false,
        workTime: [{
            start: {
                hours: 9,
                minutes: 0,
            },
            end: {
                hours: 18,
                minutes: 0
            }
        }],
        breakTime: [{
            start: {
                hours: 13,
                minutes: 0
            },
            end: {
                hours: 14,
                minutes: 0
            }
        }]
    }
);

router.get('/', (req, res) => {
    let body = req.body;

    const shops = Shop.find({}).then(
        (data) => {
            res.json({
                status: 200,
                data: {
                    shops: data
                }
            });
        }, (err) => {
            res.json({
                status: 904,
                data: {}
            });
        }
    );
});

router.post('/add', (req, res) => {
    let body = req.query;

    let newShop = new Shop({
        name: body.name || 'Default name',
        address: body.address || 'Default address',
        owner: body.owner || '5de6694e7229e4479880cecb',
        schedule: body.schedule || standartSchedule
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

router.post('update', (req, res) => {
    let body = req.query;

    Shop.updateOne({ _id: body._id }, {
        name: body.name,
        address: body.address,
        schedule: body.schedule
    }, (err) => {
        console.debug(err);
    });
})

router.delete('/delete', (req, res) => {
    var body = req.query;

    if (!body._id) {
        res.json({ status: 404 });
    }

    Shop.deleteOne({ _id: body._id }, (err) => {
        console.debug(err);
    })
});

module.exports = router;