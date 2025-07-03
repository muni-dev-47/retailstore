const express = require('express');
const router = express.Router();

const { getStacks, postStacks, putStacks } = require("../controllers/StacksContro");

router.get("/getStacks", getStacks);
router.post("/postStacks", postStacks)
router.put("/putStacks", putStacks)
module.exports = router;