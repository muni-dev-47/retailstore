const express = require('express');
const router = express.Router();

const { getSales, postSales, updateSales } = require("../controllers/SalesContro");

router.get("/getSales", getSales);
router.post("/postSales", postSales)
router.put("/putSales", updateSales)

module.exports = router;