require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');
app.use(express.json());
app.use(cors());

const uploadRoutes = require('./routes/uploadRoutes');

app.use('/api/app', uploadRoutes);

app.listen(PORT, () => {
    console.log('Upload Server Listening on Port 3001');
})
