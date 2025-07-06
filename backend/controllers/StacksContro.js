const Stacks = require("../models/stackesDBM");


const getStacks = async (req, res) => {
    try {
        const email = req.query.email;

        const doc = await Stacks.findOne({ _id: email });

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
        const { statement, email } = req.body;

        const updated = await Stacks.findOneAndUpdate(
            { _id: email },
            { $push: { stacks: { section: statement } } },
            { upsert: true, new: true }
        );

        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: "Error pushing section", error: err.message });
    }
};

const putStacks = async (req, res) => {
    const { statement, email } = req.body;
    const { date, sectionName, stacks } = statement;

    try {
        const updatedDoc = await Stacks.findOneAndUpdate(
            {
                _id: email,
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
