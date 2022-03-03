const express = require('express');
const axios = require('axios');

const PORT = process.env.PORT || 4003;
const EVENT_BUS_URL = 'http://localhost:4005/events';
const EVENT_COMMENT_CREATED = 'CommentCreated';
const EVENT_COMMENT_MODERATED = 'CommentModerated';
const COMMENT_STATUS_REJECTED = 'rejected';
const COMMENT_STATUS_APPROVED = 'approved';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === EVENT_COMMENT_CREATED) {
    const { postId, ...newComment } = data;

    newComment.status = newComment.content.includes('orange')
      ? COMMENT_STATUS_REJECTED
      : COMMENT_STATUS_APPROVED;

    await axios.post(EVENT_BUS_URL, {
      type: EVENT_COMMENT_MODERATED,
      data: { ...newComment, postId },
    });
  }
});

app.listen(PORT, () =>
  console.log(`✅✅✅ MODERATION SERVICE is listening on port ${PORT} ✅✅✅`)
);
