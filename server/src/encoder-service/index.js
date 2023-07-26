require('dotenv').config();
const express = require('express');
const app = express();
const port = 3002;
const cors = require('cors');
const path = require('path');
require('./modules/db')();

// Middlewares
app.use(cors());


// Routes
const transcodeRoute = require('./routes/transcodeRoute');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api/app', transcodeRoute);


app.listen(port, () => {
  console.log("\nTranscoder Server Listening on port", port);
})
