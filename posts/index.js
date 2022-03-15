const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const axios = require('axios');

const PORT = process.env.PORT || 4000;
const EVENT_BUS_URL = 'http://localhost:4005/events';

const app = express();

// GLOBAL MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// DATA
const posts = {};

app.get('/', (req, res) => {
  res.send('Welcome to POSTS SERVICE')
})

// ROUTE HANDLING
app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  // Assemble new post from request data
  const { title } = req.body;
  const postId = crypto.randomBytes(4).toString('hex');
  const newPost = { id: postId, title };

  // Storing new post
  posts[postId] = newPost;

  // Notify event bus of new post
  await axios.post(EVENT_BUS_URL, {
    type: 'PostCreated',
    data: newPost,
  });

  res.status(201).send(posts[postId]);
});

app.post('/events', (req, res) => {
  console.log('Event Received', req.body.type);

  res.send({});
});

app.listen(PORT, () => {
  console.log(`✅✅✅ POSTS SERVICE is listening on port ${PORT} ✅✅✅`);
});
