const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const petalsRoutes = require('./routes/petals');
const eventsRoutes = require('./routes/events');
const linearBRoutes = require('./routes/linearb.routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/petals', petalsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/linearb', linearBRoutes);

const PORT = process.env.PORT || 3013;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
