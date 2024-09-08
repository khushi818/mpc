const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  comments: [{
    type: String,
  }]
}, { timestamps: true });

const Candidate = mongoose.model('candidate', candidateSchema);

module.exports = Candidate;
