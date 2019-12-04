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
            start: Date,
            end: Date
        },
        breakTime: [{
            start: Date,
            end: Date
        }]
    }]
});

module.exports = mongoose.model('shop', ShopSchema);