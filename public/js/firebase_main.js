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

function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    // ...
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
