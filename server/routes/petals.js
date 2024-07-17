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
  const { team, date, productivity, enjoyment, teamwork, learning, stress } = req.body;

  try {
    const existingEntry = await Petals.findOne({ team, date });
    if (existingEntry) {
      return res.status(400).json({ message: 'Entry for the same team and date already exists.' });
    }

    const petals = new Petals({
      team,
      date,
      productivity,
      enjoyment,
      teamwork,
      learning,
      stress,
    });

    const newPetals = await petals.save();
    res.status(201).json(newPetals);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Petals.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
