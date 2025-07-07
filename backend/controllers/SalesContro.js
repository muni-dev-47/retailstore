const Sales = require("../models/salesDBM");

const getSales = async (req, res) => {
  try {
    const email = req.query.email;

    const doc = await Sales.findOne({ _id: email });

    if (!doc) {
      return res.status(404).json({ message: "Sales document not found" });
    }

    res.status(200).json(doc.sales);
  } catch (err) {
    res.status(500).json({ message: "Error fetching sales", error: err.message });
  }
};

const postSales = async (req, res) => {
  try {
    const { statement, email } = req.body;
    const updatedDoc = await Sales.findOneAndUpdate(
      { _id: email },
      { $push: { sales: statement } },
      { upsert: true, new: true }
    );

    res.status(200).json(updatedDoc);
  } catch (err) {
    res.status(400).json({
      message: "Error adding bill",
      error: err.message,
    });
  }
};

const updateSales = async (req, res) => {
  const { statement } = req.body;
  const { id, cusName, paymentType, bill, date, email } = statement;
  try {
    const result = await Sales.findOneAndUpdate(
      { _id: email, "sales.id": id },
      {
        $set: {
          "sales.$.cusName": cusName,
          "sales.$.paymentType": paymentType,
          ...(bill && { "sales.$.bill": bill }),
          ...(date && { "sales.$.date": date })
        }
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error updating bill", error: err.message });
  }
};
module.exports = { getSales, postSales, updateSales };