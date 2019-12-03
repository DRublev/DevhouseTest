const mongoose = require('../mongoose.js');
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
    name: String,
    adress: String,
    owner: Schema.Types.ObjectId,
    schedule: [{
        day: String,
        workHours: [{
            start: String,
            end: String
        }],
        breakHours: [{
            start: String,
            end: String
        }],
        isDayOff: Boolean
    }]
});

module.exports = mongoose.model('Shop', ShopSchema);