
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB2kMCF_wglD3NPBDjSl6phkYrorRI1LgE",
    authDomain: "minecraft-world-community.firebaseapp.com",
    databaseURL: "https://minecraft-world-community-default-rtdb.firebaseio.com",
    projectId: "minecraft-world-community",
    storageBucket: "minecraft-world-community.appspot.com",
    messagingSenderId: "79164899563",
    appId: "1:79164899563:web:36388146fef46073c63eae"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.getDatabase(firebaseConfig);