import mongoose from 'mongoose';

const userTestRecord = mongoose.Schema({
  test_id: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Please provide test_id'],
  },
  submit_result_id: {
    type: mongoose.Types.ObjectId,
  },
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username'],
    maxLength: 20,
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxLength: 30,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    validate(value) {
      if (!value.match(/.{60}/)) {
        throw new Error('Password valid error');
      }
    },
  },
  role: {
    type: String,
    enum: ['teacher', 'student', 'admin'],
    required: [true, 'Please provide role'],
  },
  subject: {
    type: String,
    enum: [
      'maths',
      'physics',
      'chemistry',
      'biology',
      'english',
      'literature',
      'history',
      'geography',
      'it',
      'natural science',
      'social science',
      'other',
    ],
  },
  class_ids: {
    type: [mongoose.Types.ObjectId],
  },
  created_tests: {
    type: [mongoose.Types.ObjectId],
  },
  assigned_tests: [userTestRecord],
  doing_tests: [userTestRecord],
  taken_tests: [userTestRecord],
  missed_test_ids: {
    type: [mongoose.Types.ObjectId],
  },
  is_blocked: Boolean,
});

userSchema.statics.isUsernameTaken = async function (username) {
  const user = await this.findOne({ username });
  return !!user;
};

const User = mongoose.model('User', userSchema);

export default User;
