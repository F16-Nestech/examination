const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subject' }], // Reference to subjects
        levels: { type: Array }, // Teach at which levels
        isTeacher: {
            type: Boolean,
            default: false,
        },
        img: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("teacher", TeacherSchema);
