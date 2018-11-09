// Initialize Firebase
const config = {
  apiKey: 'AIzaSyA-2YlKBiXZVRzPPH_4RT-z-fKmsFjDN6o',
  authDomain: 'overlookingbot-6083.firebaseapp.com',
  databaseURL: 'https://overlookingbot-6083.firebaseio.com',
  projectId: 'overlookingbot-6083',
  storageBucket: 'overlookingbot-6083.appspot.com',
  messagingSenderId: '291146026940',
};
firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true,
});

function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
  firebase.auth().getRedirectResult().then(function() {
    console.log('Login success');
  }).catch(function(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  });
}

function logout() {
  firebase.auth().signOut().then(function() {

  }).catch(function(error) {
    console.error(error);
  });
}


let loginUser = null;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    loginUser = user;
    console.log('User is logined', user);
  } else {
    loginUser = null;
    console.log('User is not logined yet.');
  }
});
