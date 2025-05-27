const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let initialState = {
    salesStatements: [],
    billDetails: { billItems: {}, cusName: {}, date: {}, paymentType: {} },
    billItem: {}
};

let initialStackData = {
    stacks: [],
    section: { section: {}},
    stack: {}
}
app.get("/get", (req, res) => {
    res.json(initialState);
});

app.post("/post", (req, res) => {
    initialState = { ...initialState, ...req.body };
    res.send("Data received successfully");
})

app.get("/stackGet", (req, res) => {
    res.json(initialStackData);
})

app.post("/stackPost", (req, res) => {
    initialStackData = { ...initialStackData, ...req.body };
    res.send("stack successFully updated");
})
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
