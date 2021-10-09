const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: 'Student',
  },
  rollNo: {
    type: String,
    default: 0
  },
  classrooms: {
    type: Array,
    default: []
  },
  level: {
    type: Number,
    default: 0
  },
  points: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model('User', UserSchema);
