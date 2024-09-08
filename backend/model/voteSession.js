const mongoose = require('mongoose');

const voteSessionSchema = new mongoose.Schema({
  candidates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'candidate',
  }],
  sessionActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const VoteSession = mongoose.model('votesession', voteSessionSchema);

module.exports = VoteSession;
