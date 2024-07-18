const express = require('express');
const linearbController = require('../controllers/linearb.controller');
const router = express.Router();

router.post('/measurements', (req, res) => linearbController.createMeasurementsReport(req, res));
router.post('/measurements/export', (req, res) => linearbController.exportMeasurementsReport(req, res));
router.get('/dashboard/metrics', (req, res) => linearbController.getDashboardMetricsByTeamAndTimeRange(req, res));

module.exports = router;