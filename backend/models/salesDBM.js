const mongoose = require("mongoose");

const billItemSchema = new mongoose.Schema({
    itemName: String,
    itemPrice: String,
    itemCount: String
});

const billSchema = new mongoose.Schema({
    id: String,
    bill: [billItemSchema],
    cusName: String,
    date: String,
    paymentType: String
});

const salesArraySchema = new mongoose.Schema({
    _id: String,          
    sales: [billSchema]
});

const Sales = mongoose.model("Sales", salesArraySchema);
module.exports = Sales;
