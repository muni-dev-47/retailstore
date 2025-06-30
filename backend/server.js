const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const connectDB = require('./config/mondb');
const app = express();


app.use(cors());

app.use(express.json());

let initialStateOfBill = {
    salesStatements: [],
    billDetails: { billItems: {}, cusName: {}, date: {}, paymentType: {} },
    billItem: {}
};

let initialStateOfStack = {
    stacks: [],
    section: { section: {} },
    stack: {}
}

app.get("/getBills", (req, res) => {
    res.json(initialStateOfBill);
})

app.get("/getStack", (req, res) => {
    res.json(initialStateOfStack);
})

connectDB();

app.listen(5000, () => console.log("Server running on port 5000"));
