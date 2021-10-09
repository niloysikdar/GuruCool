const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassroomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  students: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('Classroom', ClassroomSchema);