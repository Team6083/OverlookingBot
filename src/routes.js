import express from 'express';

import {log} from './utils';

import {db} from './modules/firebase/index';
import {getWeb} from './modules/slack/index';

const router = new express.Router();
const firestore = db();
const webAPI = getWeb();

router.post('/slack/refreshChannels', (req, res) => {
  const dbchannelsList = firestore.collection('slack').doc('channels').collection('list');
  webAPI.channels.list().then((resGet) => {
    if (resGet.ok) {
      resGet.channels.forEach((channel) => {
        dbchannelsList.doc(channel.id).set(channel);
      });
      res.sendStatus(200);
    } else {
      log.wanrning(`Error occurred: ${resGet.error}`);
      res.status(500).send('Internal Server Error:'+resGet.error);
    }
  });
});

router.post('/slack/refrechUsers', (req, res) => {
  const dbusersList = firestore.collection('slack').doc('users').collection('list');
  webAPI.users.list().then((resGet) => {
    if (resGet.ok) {
      resGet.members.forEach((member) => {
        if (!member.deleted) {
          dbusersList.doc(member.id).set(member);
        }
      });
      res.sendStatus(200);
    } else {
      log.wanrning(`Error occurred: ${resGet.error}`);
      res.status(500).send('Internal Server Error:'+resGet.error);
    }
  });
});

export default router;
