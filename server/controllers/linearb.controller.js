const linearbService = require('../services/linearb.service');

class LinearBController {
  async createMeasurementsReport(req, res) {
    try {
      const data = await linearbService.createMeasurementsReport(req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
  }

  async exportMeasurementsReport(req, res) {
    try {
      const data = await linearbService.exportMeasurementsReport(req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
  }

  async getDashboardMetricsByTeamAndTimeRange(req, res) {
    const { teamId, after, before } = req.query;
    try {
      const timeRange = { after, before };
      const data = await linearbService.getDashboardMetricsByTeamAndTimeRange(teamId, timeRange);
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
  }
}

module.exports = new LinearBController();