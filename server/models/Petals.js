const mongoose = require('mongoose');

const PetalsSchema = new mongoose.Schema({
  team: String,
  date: Date,
  productivity: Number,
  enjoyment: Number,
  teamwork: Number,
  learning: Number,
  stress: Number,
});

module.exports = mongoose.model('Petals', PetalsSchema);