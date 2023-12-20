import mongoose from 'mongoose';
const notificationSchema = mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Please provide notification message'],
    maxLength: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const classSchema = mongoose.Schema({
  class_name: {
    type: String,
    required: [true, 'Please provide class_name'],
    maxLength: 15,
    unique: true,
  },
  grade: {
    type: Number,
    required: [true, 'Please provide grade'],
    validate(value) {
      if (value < 0 || value > 13) {
        throw new Error('grade valid error');
      }
    },
  },
  student_ids: {
    type: [mongoose.Types.ObjectId],
    required: [true, 'Please provide student_ids'],
  },
  available_test_ids: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  notifications: {
    type: [notificationSchema],
    default: [],
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
});

classSchema.statics.isClassNameTaken = async function (class_name) {
  const existingClass = await this.findOne({ class_name });
  return !!existingClass;
};

const Class = mongoose.model('Class', classSchema);

export default Class;
