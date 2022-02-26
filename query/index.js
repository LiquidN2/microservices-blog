const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 4002;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Query service is listening on ${PORT}`));
