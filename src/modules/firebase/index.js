const admin = require('firebase-admin');

const serviceAccount = require('../../../config/firebaseServiceAccount.json');

module.exports.db = () => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    const settings = {timestampsInSnapshots: true};
    admin.firestore().settings(settings);
  }
  return admin.firestore();
};
