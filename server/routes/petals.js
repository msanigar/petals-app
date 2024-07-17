const express = require('express');
const Petals = require('../models/Petals');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const petalsData = await Petals.find();
    res.json(petalsData);
  } catch (err) {
    res.status(500).json({ message: err.message });
}
});

router.post('/', async (req, res) => {
const petals = new Petals({
  team: req.body.team,
  date: req.body.date,
  productivity: req.body.productivity,
  enjoyment: req.body.enjoyment,
  teamwork: req.body.teamwork,
  learning: req.body.learning,
  stress: req.body.stress,
});

try {
  const newPetals = await petals.save();
  res.status(201).json(newPetals);
} catch (err) {
  res.status(400).json({ message: err.message });
}
});

module.exports = router;