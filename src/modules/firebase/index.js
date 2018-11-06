const admin = require('firebase-admin');

const serviceAccount = require('../../../config/firebaseServiceAccount.json');

module.exports.init = (firebaseConfig) => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};

module.exports.db = () => {
  const firestore = admin.firestore();
  const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);
  return firestore;
};
