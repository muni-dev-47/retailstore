const Stacks = require("../models/stackesDBM");

const MAIN_DOC_ID = "single-stacks-data";

const getStacks = async (req, res) => {
    try {
        const doc = await Stacks.findOne({ _id: MAIN_DOC_ID });

        if (!doc) {
            return res.status(404).json({ message: "Stacks document not found" });
        }

        res.status(200).json(doc.stacks);
    } catch (err) {
        console.error("Error fetching stacks:", err.message);
        res.status(500).json({ message: "Error fetching stacks", error: err.message });
    }
};

const postStacks = async (req, res) => {
    try {
        const section = req.body;

        const updated = await Stacks.findOneAndUpdate(
            { _id: MAIN_DOC_ID },
            { $push: { stacks: { section } } },
            { upsert: true, new: true }
        );

        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: "Error pushing section", error: err.message });
    }
};

const putStacks = async (req, res) => {
    const { date, sectionName, stacks } = req.body;

    try {
        const updatedDoc = await Stacks.findOneAndUpdate(
            {
                _id: MAIN_DOC_ID,
                stacks: {
                    $elemMatch: {
                        "section.date": date,
                        "section.sectionName": sectionName
                    }
                }
            },
            {
                $set: {
                    "stacks.$.section.stacks": stacks
                }
            },
            { new: true }
        );

        if (!updatedDoc) {
            return res.status(404).json({ message: "Matching section not found" });
        }

        res.status(200).json(updatedDoc);
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message });
    }
};


module.exports = { getStacks, postStacks, putStacks };
