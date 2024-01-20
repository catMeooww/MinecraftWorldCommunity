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

userName = localStorage.getItem("user");
roomName = localStorage.getItem("room");

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
      childKey = childSnapshot.key; childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebaseMessageId = childKey;
        messageData = childData;
        //Início do código
        console.log(firebaseMessageId);
        console.log(messageData);
        name = messageData['name'];
        message = messageData['message'];
        like = messageData['like'];
        nameWithTag = "<h4 style='text-shadow:5px 5px 5px black'> " + name + "<img class='user_tick' src='UserCreeper.png'></h4>";
        messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button = "<button class='MCButton' id=" + firebaseMessageId + " onclick='updateLike(this.id)'><img src='Diamond.png' id='icon'> Likes:" + like + "</button>";
        delete_button = "<button class='MCButton' id=" + firebaseMessageId + " onclick='deleteMsg(this.id)'><img src='tnt.webp' id='icon'> delete:" + firebaseMessageId + "</button>";
        hr = "<hr>"
        if (name == userName) {
          row = nameWithTag + messageWithTag + delete_button + hr;
        } else {
          row = nameWithTag + messageWithTag + like_button + hr;
        }
        document.getElementById("output").innerHTML += row;
        //Fim do código
      } else {
        document.getElementById("output").innerHTML += "<h3>" + childData + "</h3>";
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

function deleteMsg(messageId) {
  swal(
    {
      title: `DELETE THIS MESSAGE`,
      text: "Are you sure DELETING this?",
      imageUrl:
        "tnt.webp",
      imageSize: "150x150",
      confirmButtonText: "DELETE MESSAGE"
    },
    function (isConfirm) {
      if (isConfirm) {
        firebase.database().ref(roomName).child(messageId).update({
          name: null,
          message: null,
          like: null
        });
      }
    }
  );
}

function logout() {
  swal(
    {
      title: `Leave Room`,
      text: "Want to leave this room?",
      imageUrl:
        "exitdoor.webp",
      imageSize: "150x150",
      confirmButtonText: "Leave Room"
    },
    function (isConfirm) {
      if (isConfirm) {
        localStorage.removeItem("room");
        window.location = "MinecraftRooms.html";
      }
    }
  );
}