function login(){
    user = document.getElementById("username").value;
    if(user == ""){
        document.getElementById("username").style.borderColor = "red";
    }else{
        localStorage.setItem("user",user);
        window.location = "MinecraftRooms.html"
    }
}