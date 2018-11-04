import 'babel-polyfill';

const {RTMClient} = require('@slack/client');

import config from 'config';
import express from 'express';
import http from 'http';

import bootstrap from './bootstrap';
import {log, normalizePort} from './utils';

const token = process.env.SLACK_TOKEN;

const app = express();
app.start = async () => {
  log.info('Starting Server...');
  const port = normalizePort(config.get('port'));
  app.set('port', port);
  bootstrap(app);
  const server = http.createServer(app);

  server.on('error', (error) => {
    if (error.syscall !== 'listen') throw error;
    log.error(`Failed to start server: ${error}`);
    process.exit(1);
  });

  server.on('listening', () => {
    const address = server.address();
    log.info(`Server listening ${address.address}:${address.port}`);
  });

  server.listen(port);
};

app.start().catch((err) => {
  log.error(err);
});

export default app;

// // The client is initialized and then started to get an active connection to the platform
// const rtm = new RTMClient(token);
// rtm.start();
//
// rtm.on('message', (event) => {
//   console.log(event);
// });
