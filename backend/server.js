const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mondb');
const app = express();

app.use(cors());

app.use(express.json());


app.use("/api/", require("./routes/salesRoute"));
app.use("/api/", require("./routes/stackRoute"));
app.use("/api/", require("./routes/loginRoute"))

connectDB();

app.listen(5000, () => console.log("Server running on port 5000"));
