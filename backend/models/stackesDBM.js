const mongoose = require("mongoose");

const stackItemSchema = new mongoose.Schema({
  itemName: String,
  itemPrice: Number,
  itemCount: Number
});

const sectionSchema = new mongoose.Schema({
  stacks: [stackItemSchema],
  date: String,
  sectionName: String
});

const fullSchema = new mongoose.Schema({
  _id: String,
  stacks: [
    {
      section: sectionSchema
    }
  ]
});

const Stacks = mongoose.model("Stacks", fullSchema);
module.exports = Stacks;
