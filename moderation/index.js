const express = require('express');
const axios = require('axios');

const PORT = process.env.PORT || 4003;
const EVENT_BUS_URL = 'http://localhost:4005/events';
const EVENT_COMMENT_CREATED = 'CommentCreated';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === EVENT_COMMENT_CREATED) {
    const { id, content, postId } = data;
  }
});

app.listen(PORT, () =>
  console.log(`✅✅✅ MODERATION SERVICE is listening on port ${PORT} ✅✅✅`)
);
