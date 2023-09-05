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
      row = "<div class='roomName' id=" + roomNames + " onclick='redirectToRoomName(this.id)'>" + roomNames + "</div><br><br>";
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