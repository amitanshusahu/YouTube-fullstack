require('dotenv').config();
const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
require('./modules/db')();

//Middlewares
app.use(express.json({limit: "10mb"}));
app.use(cors());

// Routes
const channelRoutes = require('./routes/channelRoutes');

app.use('/api/app/', channelRoutes);

app.listen(port, () => {
  console.log('Server listening on port ', port)
})