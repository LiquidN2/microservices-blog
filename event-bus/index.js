const express = require('express');
const axios = require('axios');

const PORT = process.env.PORT || 4005;

const app = express();

// GLOBAL MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTE HANDLING
app.post('/events', (req, res) => {
  const event = req.body;

  // POSTS
  axios
    .post('http://localhost:4000/events', event)
    .catch(err => console.error(err));

  // COMMENTS
  axios
    .post('http://localhost:4001/events', event)
    .catch(err => console.error(err));

  // QUERY
  axios
    .post('http://localhost:4002/events', event)
    .catch(err => console.error(err));

  // MODERATION
  axios
    .post('http://localhost:4003/events', event)
    .catch(err => console.error(err));

  res.send('Ok');
});

app.listen(PORT, () =>
  console.log(`✅✅✅ EVENT BUS is listening on ${PORT} ✅✅✅`)
);
