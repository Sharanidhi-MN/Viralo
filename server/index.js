const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const analyzeRoute = require('./routes/analyze');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/analyze', analyzeRoute);

app.get('/', (req, res) => {
  res.send('Viral Video Chopper API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
