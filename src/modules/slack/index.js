const {RTMClient, WebClient} = require('@slack/client');
import {log} from '../../utils';
import firebase from '../firebase/index';

const token = process.env.SLACK_TOKEN;
const rtm = new RTMClient(token);
const web = new WebClient(token);

export default function(slackConfig, db) {

  rtm.start().catch((err) => {
    log.error(err);
  });

  rtm.on('error', (err) => log.error(err));

  rtm.on('ready', (event) => {
    log.info('Bot is ready.');
  });

  rtm.on('message', (event) => {
    const msgLogRef = db.collection('messages');
    const message = event;

    // Skip messages that are from a bot or my own user ID
    if ((message.subtype && message.subtype === 'bot_message') ||
      (!message.subtype && message.user === rtm.activeUserId)) {
      return;
    }

    // Log the message
    log.info(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
    msgLogRef.add(message);
  });
}

module.exports.getRTM = () => {
  if (rtm.connected) return rtm;
  else return undefined;
};

module.exports.getWeb = () => {
  return web;
};
