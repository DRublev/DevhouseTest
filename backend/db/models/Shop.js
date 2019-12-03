const mongoose = require('../mongoose.js');
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
    name: String,
    address: String,
    owner: Schema.Types.ObjectId,
    schedule: [{
        day: {
            type: String,
            enum: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        },
        isDayOff: Boolean,
        workTime: {
            start: {
                hours: { type: Number, max: 23, min: 0 },
                minutes: { type: Number, max: 59, min: 0 }
            },
            end: {
                hours: { type: Number, max: 23, min: 0 },
                minutes: { type: Number, max: 59, min: 0 }
            }
        },
        breakTime: {
            start: {
                hours: { type: Number, max: 23, min: 0 },
                minutes: { type: Number, max: 59, min: 0 }
            },
            end: {
                hours: { type: Number, max: 23, min: 0 },
                minutes: { type: Number, max: 59, min: 0 }
            }
        }
    }]
});

module.exports = mongoose.model('shop', ShopSchema);