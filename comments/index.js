const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const axios = require('axios');

const PORT = process.env.PORT || 4001;
const EVENT_BUS_URL = 'http://localhost:4005/events';

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

app.post('/posts/:id/comments', async (req, res) => {
  // Assemble new comment from request data
  const { id: postId } = req.params;
  const { content } = req.body;
  const commentId = crypto.randomBytes(4).toString('hex');
  const newComment = { id: commentId, content };

  // Storing new comment
  commentsByPostId[postId] = commentsByPostId[postId] || [];
  commentsByPostId[postId].push(newComment);

  // Notify event bus of new comment
  await axios.post(EVENT_BUS_URL, {
    type: 'CommentCreated',
    data: { ...newComment, postId },
  });

  // Respond to request
  res.status(201).send(newComment);
});

app.post('/events', (req, res) => {
  console.log('Event Received', req.body.type);

  res.send({});
});

app.listen(PORT, () => console.log(`Comments service is listening on ${PORT}`));
