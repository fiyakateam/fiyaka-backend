import express from 'express';
import app from './app';
const port = process.env.PORT;

app.get('/ping', (req: express.Request, res: express.Response) => {
  res.status(200).send('pong');
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
