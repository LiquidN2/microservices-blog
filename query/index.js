const express = require('express');
const cors = require('cors');
const events = require('events');
const axios = require('axios');

const PORT = process.env.PORT || 4002;
const EVENT_BUS_URL = 'http://localhost:4005/events';
const EVENT_POST_CREATED = 'PostCreated';
const EVENT_COMMENT_CREATED = 'CommentCreated';
const EVENT_COMMENT_UPDATED = 'CommentUpdated';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === EVENT_POST_CREATED) {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === EVENT_COMMENT_CREATED) {
    const { postId, ...newComment } = data;
    const post = posts[postId];
    post.comments.push(newComment);
  }

  if (type === EVENT_COMMENT_UPDATED) {
    const { postId, ...updatedComment } = data;
    const post = posts[postId];
    const comment = post.comments.find(
      comment => comment.id === updatedComment.id
    );
    comment.status = updatedComment.status;
    comment.content = updatedComment.content;
  }
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(PORT, async () => {
  console.log(`✅✅✅ QUERY SERVICE is listening on ${PORT} ✅✅✅`);

  try {
    const res = await axios.get(EVENT_BUS_URL);

    for (let event of res.data) {
      console.log(`Processing event ${event.type}`);
      handleEvent(event.type, event.data);
    }
  } catch (e) {}
});
