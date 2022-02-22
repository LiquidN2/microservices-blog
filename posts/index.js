const express = require('express');
const crypto = require('crypto');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 4000;

// GLOBAL MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// DATA
const posts = {};

// ROUTE HANDLING
app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const { title } = req.body;

  const postId = crypto.randomBytes(4).toString('hex');

  posts[postId] = { id: postId, title };

  res.send(posts[postId]);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
