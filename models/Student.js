const mongoose = require("mongoose");
// Học sinh được cấp Token có thời hạn khi làm bài thi
const StudentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        subjects: { type: Array },
        isStudent: {
            type: Boolean,
            default: false,
        },

        img: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("student", StudentSchema);