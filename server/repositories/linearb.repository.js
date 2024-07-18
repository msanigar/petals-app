const axios = require('axios');
const { linearB } = require('../config');

const {  linearbBaseUrl, linearbApiKey } = linearB;

const axiosInstance = axios.create({
  baseURL: linearbBaseUrl,
  headers: {
    'x-api-key': linearbApiKey,
    'Content-Type': 'application/json'
  }
});

class LinearBRepository {
  async createMeasurementsReport(params) {
    try {
      const response = await axiosInstance.post('/measurements', params);
      return response.data;
    } catch (error) {
      console.error('Error creating measurements report:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async exportMeasurementsReport(params, fileFormat) {
    try {
      const response = await axiosInstance.post('/measurements/export', params, {
        params: { file_format: fileFormat }
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting measurements report:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
}

module.exports = new LinearBRepository();