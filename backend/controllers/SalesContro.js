const Sales = require("../models/salesDBM");


const MAIN_DOC_ID = "single-sales-data";

const getSales = async (req, res) => {
    try {
        const doc = await Sales.findOne({ _id: MAIN_DOC_ID });

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
        const newBill = req.body;

        const updatedDoc = await Sales.findOneAndUpdate(
            { _id: MAIN_DOC_ID },
            { $push: { sales: newBill } },
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
  const { id, cusName, paymentType, bill, date } = req.body;

  try {
    const result = await Sales.findOneAndUpdate(
      { _id: "single-sales-data", "sales.id": id },
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
module.exports = { getSales, postSales , updateSales };