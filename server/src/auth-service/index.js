require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
require('./modules/db')();


app.use(express.json());
app.use(cors());

//Routes
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log('\nAuthentication Server Listening On Port ', port)
})
