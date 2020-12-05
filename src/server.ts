import express from 'express';
const app: express.Application = express();
app.get('/', function (req, res) {
  res.send('Hello World v0.0.16!');
});
app.get('/ping', function (req, res) {
  res.send('pong!');
});

const port = process.env.PORT ?? 3000;

app.listen(port, function () {
  console.log(`App started on ${port}!`);
});
