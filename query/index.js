const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// posts = {
//  postId:{
//   id:postId,
//   title,
//   comments:[{commentId, content}]
//  }
// }

app.get('/posts', (req, res) => {
  res.send(posts);
});

const handleEvents = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comments = post.comments;
    const comment = comments.find((comment) => comment.id === id);
    comment.id = id;
    comment.content = content;
    comment.postId = postId;
    comment.status = status;
  }
};

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log('Received event', req.body.type);

  handleEvents(type, data);

  res.send({});
});

app.listen(4002, async () => {
  const res = await axios.get('http://event-bus-srv:4005/events');

  for (let event of res.data) {
    console.log('Processing event : ', event.type);
    handleEvents(event.type, event.data);
  }
  console.log('Query service listening on port 4002');
});
