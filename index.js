const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const webpush = require('web-push');
const path = require('path');
const fetch = require('node-fetch');
const vapid = require('./vapid');

const app = express();
const port = 8083;

app.use(bodyparser);
app.use(cors('*'));

app.post('/subscribe', async (req, res) => {
  const subscription = req.body;
  subscription.id = subscription.endpoint;

  await fetch('http://localhost:3000/clients', {
    method: "POST",
    headers : {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription)
  });

  res.status(201).json();
});

app.listen(port, () => console.log('App listening on port ', port));