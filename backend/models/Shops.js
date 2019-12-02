const mongoose = require('mongoose');

const { Schema } = mongoose;

const ShopScheme = new ShopScheme({
    name: String,
    owner: mongoose.Schema.Types.ObjectId,
    schedule: [{
        day: String,
        workTime: { start: int, end: end },
        breakTime: [{ start: int, end: int }],
    }],
    adress: String,
});

mongoose.model('Shops', ShopScheme);