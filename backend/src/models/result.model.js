import mongoose from 'mongoose';

const resultSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Please provide user_id'],
    },
    test_id: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Please provide test_id'],
    },
    answers: {
      type: [[Number]],
      default: [],
    },
    score: Number,
    is_end_test: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model('Result', resultSchema);

export default Result;
