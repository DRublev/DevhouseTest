const mongoose = require('mongoose');

const { Schema } = mongoose;

const ShopScheme = new ShopScheme({
    name: String,
    owner: mongoose.Schema.Types.ObjectId,
    schedule: [{
        dayName: String,
        isDayOff: Boolean,
        workTime: { start: int, end: end },
        breakTime: [{ start: int, end: int }],
    }],
    isOpen: false,
    adress: String,
});

mongoose.model('Shops', ShopScheme);