const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(express.json({ limit: '25mb' }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
