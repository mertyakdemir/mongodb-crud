const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExampleSchema = new Schema({
    title: String,
    isOnline: Boolean,
    comments: [{ message: String }],
    att: {
        vote: Number
    },

});

module.exports = mongoose.model('product', ExampleSchema)