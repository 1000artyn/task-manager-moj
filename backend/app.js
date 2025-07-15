const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;