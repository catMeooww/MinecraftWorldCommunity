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

if(userName == undefined || roomName == undefined){
  window.location = "index.html";
}

document.getElementById("UserNameShow").innerHTML = "User: " + userName;

var SType = "text";

function send() {
  msg = document.getElementById("msg").value;
  if(SType == "text"){
  firebase.database().ref(roomName).push({
    name: userName,
    message: msg,
    like: 0,
    type: "text"
  });
}else if(SType == "img"){
  firebase.database().ref(roomName).push({
    name: userName,
    message: msg,
    like: 0,
    type: "img"
  });
}else if(SType == "anchor"){
  firebase.database().ref(roomName).push({
    name: userName,
    message: msg,
    like: 0,
    type: "anchor"
  });
}
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
        console.log("Load Message: " + firebaseMessageId);
        name = messageData['name'];
        message = messageData['message'];
        like = messageData['like'];
        type = messageData['type'];
        nameWithTag = "<h4 style='text-shadow:5px 5px 5px black'> " + name + "<img class='user_tick' src='UserCreeper.png'></h4>";
        if (type == "text" || type == undefined) {
          messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
        }else if(type == "img"){
          messageWithTag = "<img class='message_img' src='"+message+"'><br>";
        }else if(type == "anchor"){
          messageWithTag = "<a class='message_anchor' href='"+message+"'>View Website -"+message+"</a><br><br>";
        }
        like_button = "<button class='MCButton' id=" + firebaseMessageId + " onclick='updateLike(this.id," + like + ")'><img src='Diamond.png' id='icon'> Likes:" + like + "</button>";
        like_info = "<h4 class='MCButton' style='border-color:cyan;'><img src='Diamond.png' id='icon'> Likes:"+like+"</h4>";
        delete_button = "<button class='MCButton' id=" + firebaseMessageId + " onclick='deleteMsg(this.id)'><img src='tnt.webp' id='icon'> delete:" + firebaseMessageId + "</button>";
        hr = "<hr>";
        if (name == userName) {
            row = nameWithTag + messageWithTag + like_info +delete_button + hr;
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

function updateLike(messageId, likes) {
  console.log("Add Like - " + messageId, " | " + likes);
  updatedLikes = Number(likes) + 1;

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
          like: null,
          type: null
        });
      }
    }
  );
}

function switchType(){
  if(SType == "text"){
    SType = "img";
    document.getElementById("TypeButton").innerHTML = "Image";
    document.getElementById("msg").placeholder = "Image URL";
  }else if(SType == "img"){
    SType = "anchor";
    document.getElementById("TypeButton").innerHTML = "Link";
    document.getElementById("msg").placeholder = "Link";
  }else{
    SType = "text";
    document.getElementById("TypeButton").innerHTML = "Text";
    document.getElementById("msg").placeholder = "Mesage";
  }
  console.log(SType);
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