const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    name: String,
    img: String,
    rate: String,
    age: String,
    money: String,
    percent: String,
    url: String,
    my_rate: String,
});

mongoose.model('Member', UserShema);