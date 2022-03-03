const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 4002;
const EVENT_POST_CREATED = 'PostCreated';
const EVENT_COMMENT_CREATED = 'CommentCreated';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === EVENT_POST_CREATED) {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === EVENT_COMMENT_CREATED) {
    const { postId, ...newComment } = data;
    const post = posts[postId];
    post.comments.push(newComment);
  }
});

app.listen(PORT, () =>
  console.log(`✅✅✅ QUERY SERVICE is listening on ${PORT} ✅✅✅`)
);
