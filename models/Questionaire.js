const mongoose = require("mongoose");

const QuestionnaireSchema = new mongoose.Schema(
    {
        teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher', required: true },
        subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subject' }], // Reference to subjects
        level: { type: String, enum: ['intermediate', 'high'], required: true },
        questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'question' }],
        maxScore: { type: Number, required: true },
        title: { type: String, required: true }, // Title of the questionnaire
        desc: { type: String }, // Description of the questionnaire
        creation_date: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

module.exports = mongoose.model("questionnaire", QuestionnaireSchema);
