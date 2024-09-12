const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'candidate',
    required: true,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'votesession',
    required: true,
  },
  index : []
}, { timestamps: true });

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
