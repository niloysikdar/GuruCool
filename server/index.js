const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routers/userRouter');
require('dotenv').config();
const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
app.use('/auth', userRouter);
// simple route
app.get('/', (req, res) => {
  res.json({ message: 'HackX api.' });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await mongoose
    .connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Successfully connect to MongoDB.');
    })
    .catch((err) => {
      console.error('Connection error', err);
      process.exit();
    });

  console.log(`Server is running on port ${PORT}.`);
});
