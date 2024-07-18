const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Event', EventSchema);
