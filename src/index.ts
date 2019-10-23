// tslint:disable:no-console
import bodyParser from 'body-parser';
import express from 'express';
import * as rawConfig from '../config.json';
import { Config } from './Config';
import { logger } from './logger';

const app = express();
const config = Config.from(rawConfig);
const port = config.port;

app.use(logger());
app.use(bodyParser.json());

app.all('*', (req, res, _) => {
  console.log('>>> url:', req.url);
  console.log('>>> method:', req.method);
  console.log('>>> headers:', req.headers);
  console.log('>>> body:', req.body);
  const delay = Number.parseInt(req.query.delay || '0', 10);
  const status = Number.parseInt(req.query.status || '200', 10);
  const message = req.query.msg || 'Dummy message';
  const sendResponse = () => {
    res.set('X-Dummy', 'dummy');
    res
      .status(status)
      .send({ message });
  };
  if (delay > 0) {
    setTimeout(sendResponse, delay);
  } else {
    sendResponse();
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
