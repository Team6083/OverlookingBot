const {RTMClient, WebClient} = require('@slack/client');
import {log} from '../../utils';

const token = process.env.SLACK_TOKEN;
const rtm = new RTMClient(token);
const web = new WebClient(token);

export default function(slackConfig, db) {
  const msgLogRef = db.collection('messages');

  rtm.start().catch((err) => {
    log.error(err);
  });

  rtm.on('error', (err) => log.error(err));

  rtm.on('ready', (event) => {
    console.log('Bot is ready.');
  });

  rtm.on('message', (event) => {

    const message = event;

    // Skip messages that are from a bot or my own user ID
    if ((message.subtype && message.subtype === 'bot_message') ||
      (!message.subtype && message.user === rtm.activeUserId)) {
      return;
    }

    // Log the message
    console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
    msgLogRef.add(message);
  });
}

module.export.getRTM = () => {
  if (rtm.connected) return rtm;
  else return undefined;
};
