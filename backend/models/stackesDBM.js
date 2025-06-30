const mongoose = require("mongoose");

const stackSchema = new mongoose.Schema({
  itemName: String,
  itemPrice: Number,
  itemCount: Number
});

const sectionSchema = new mongoose.Schema({
  section: {
    stacks: [stackSchema],
    date: String,         
    sectionName: String
  }
});

const Section = mongoose.model("Stacks", sectionSchema);
module.exports = Section;
