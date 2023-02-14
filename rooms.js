
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBDXlPghTnebO2CbPG-8kMuW-jUu6QzJeE",
  authDomain: "minecraftcommunity-6b81a.firebaseapp.com",
  databaseURL: "https://minecraftcommunity-6b81a-default-rtdb.firebaseio.com",
  projectId: "minecraftcommunity-6b81a",
  storageBucket: "minecraftcommunity-6b81a.appspot.com",
  messagingSenderId: "770302856414",
  appId: "1:770302856414:web:c61c0308eff9d7f485c64f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//load user
gamemode = "survival"

function loadUser() {
  user = localStorage.getItem("user");
  document.getElementById("userName").innerHTML = user;
}
function selectGamemode() {
  if (gamemode == "survival") {
    gamemode = "creative";
    document.getElementById("gamemode").innerHTML = gamemode;
    document.getElementById("gamemode").style.backgroundColor = "rgb(61, 221, 21)";
  } else {
    gamemode = "survival"
    document.getElementById("gamemode").innerHTML = gamemode;
    document.getElementById("gamemode").style.backgroundColor = "rgb(233, 79, 8)";
  }
  console.log(gamemode);
}
function addRoom() {
  roomName = document.getElementById("roomName").value;
  firebase.database().ref("/").child(roomName).update({
    purpose: roomName + " - Gamemode: " + gamemode
  });

  localStorage.setItem("room", roomName);

  window.location = "MinecraftPage.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      roomNames = childKey;
      console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id=" + roomNames + " onclick='redirectToRoomName(this.id)' style='background: rgba(255, 255, 255, 0.8);'>" + roomNames + "</div><br><br>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room", name);
  window.location = "MinecraftPage.html";
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("room");
  window.location = "index.html";
}