const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    // Other subject-related fields
});

module.exports = mongoose.model("subject", SubjectSchema);
