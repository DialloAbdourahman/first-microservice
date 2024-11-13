const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const handleEvents = async (type, data) => {
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentModerated',
      data: { ...data, status },
    });
  }
};

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('Received event', req.body.type);

  await handleEvents(type, data);

  res.send({});
});

app.listen(4003, async () => {
  // const res = await axios.get('http://event-bus-srv:4005/events');

  // for (let event of res.data) {
  //   console.log('Processing event : ', event.type);
  //   handleEvents(event.type, event.data);
  // }
  console.log('Moderation service listening on port 4003');
});
