const mongoose = require("mongoose");

const QuestionListSchema = new mongoose.Schema(
    {
        teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher', required: true },
        subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subject' }], // Reference to subjects
        level: { type: String, enum: ['intermediate', 'high'], required: true },
        questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'question' }],
        title: { type: String, required: true }, // Title of the question list
        desc: { type: String }, // Description of the question list
    },
    { timestamps: true }
);

module.exports = mongoose.model("questionList", QuestionListSchema);
