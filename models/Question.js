const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
    {
        subject: { type: String, required: true },//chủ đề thi
        question_type: { type: String, required: true },//loại câu trắc nghiệm hay mở 
        content: { type: String, required: true, unique: true }, //nội dung câu hỏi
        answer: { type: String, required: true },
        score: { type: Number, required: true },

        img: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("question", QuestionSchema);