const express = require('express');
const crypto = require('crypto');
const cors = require('cors');

const PORT = process.env.PORT || 4001;

const app = express();

// GLOBAL MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// DATA
const commentsByPostId = {};

// ROUTE HANDLING
app.get('/posts/:id/comments', (req, res) => {
  const { id: postId } = req.params;

  commentsByPostId[postId] = commentsByPostId[postId] || [];

  res.send(commentsByPostId[postId]);
});

app.post('/posts/:id/comments', (req, res) => {
  const { id: postId } = req.params;
  const { content } = req.body;
  const commentId = crypto.randomBytes(4).toString('hex');

  commentsByPostId[postId] = commentsByPostId[postId] || [];

  commentsByPostId[postId].push({ id: commentId, content });

  res.send(commentsByPostId[postId]);
});

app.listen(PORT, () => console.log(`Comments service is listening on ${PORT}`));
