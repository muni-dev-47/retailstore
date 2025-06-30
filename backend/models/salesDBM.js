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
    sales: [billSchema] 
});

const SalesArray = mongoose.model("SalesArray", salesArraySchema);
module.exports = SalesArray;
