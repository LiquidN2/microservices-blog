const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 4002;
const POST_CREATED = 'PostCreated';
const COMMENT_CREATED = 'CommentCreated';

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

  if (type === POST_CREATED) {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === COMMENT_CREATED) {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, content });
  }
});

app.listen(PORT, () => console.log(`Query service is listening on ${PORT}`));
