// Initialize Firebase
var config = {
    apiKey: "AIzaSyA-2YlKBiXZVRzPPH_4RT-z-fKmsFjDN6o",
    authDomain: "overlookingbot-6083.firebaseapp.com",
    databaseURL: "https://overlookingbot-6083.firebaseio.com",
    projectId: "overlookingbot-6083",
    storageBucket: "overlookingbot-6083.appspot.com",
    messagingSenderId: "291146026940"
  };
  firebase.initializeApp(config);

function login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  var loginUser = null;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      loginUser = user;
      console.log("User is logined", user);
    } else {
      loginUser = null;
      console.log("User is not logined yet.");
    }
  });