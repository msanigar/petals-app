const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const petalsRoutes = require('./routes/petals');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/petals', petalsRoutes);

const PORT = process.env.PORT || 3013;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});