
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

userName = localStorage.getItem("user");
roomName = localStorage.getItem("roomName");

function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(roomName).push({
    name: userName,
    message: msg,
    like: 0
  });

  document.getElementById("msg").value = "";
}

function getData() {
  firebase.database().ref("/" + roomName).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
        firebaseMessageId = childKey;
        messageData = childData;
        //Início do código
        console.log(firebaseMessageId);
        console.log(messageData);
        name = messageData['name'];
        message = messageData['message'];
        like = messageData['like'];
        nameWithTag = "<h4> " + name + "<img class='user_tick' src='UserCreeper.png'></h4>";
        messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button = "<button class='btn btn-success' id=" + firebaseMessageId + " value=" + like + " onclick='updateLike(this.id)'>";
        spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'> Like: " + like + "</span></button><hr>";

        row = nameWithTag + messageWithTag + like_button + spanWithTag;
        document.getElementById("output").innerHTML += row;
        //Fim do código
      }
    });
  });
}
getData();

function updateLike(messageId) {
  console.log("botão de like pressionado - " + messageId);
  buttonId = messageId;
  likes = document.getElementById(buttonId).value;
  updatedLikes = Number(likes) + 1;
  console.log(updatedLikes);

  firebase.database().ref(roomName).child(messageId).update({
    like: updatedLikes
  });

}


function logout() {
  localStorage.removeItem("room");
  window.location = "MinecraftRooms.html";
}