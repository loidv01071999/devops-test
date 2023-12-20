const express = require('express');
const app = express();

app.get('/heartbeat', (req, res, next) => {
  return res.status(200).send('ok');
});

app.listen(3000, () => {
  console.log('application running');
});
