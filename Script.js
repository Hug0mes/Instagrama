function register() {

    alert("Estás regitado acho eu");

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var rpassword = document.getElementById("rpassword").value;
    var username = document.getElementById("username").value; //formato ano-mes-dia

    if (password == rpassword) {
        fetch('https://instagrama.pt/api/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                username: username
            })
        }).then(res => res.json())
            .then(res => checkRegister(res));
    }

}

function checkRegister(res) {
    console.log(res);
    if (res.message == "CREATED") {
        alert("Conta criada com sucesso!");
        location.replace("User_Area.html");
    } else {
        alert("Erro");
    }
}

function Login() {
    alert("Register button pressed");
  
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    console.log(email);
  
    fetch('https://instagrama.pt/api/login', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
  
            email: email,
            password: password
         
        })
    }).then(res => res.json())
        .then(res => checkLogin(res));
}

function checkLogin(res) {
    console.log(res)
    if (res.token != null) {
        alert("Login com sucesso!");
        localStorage.setItem("token", res.token); 
        location.replace("User_Area.html");
    }
    else {
        alert("Erro!");
    }
}  

function counter(x){
    x = 1
    h2.text(x)
    x = x +1;
}
  


function getProfile(){

    var token = localStorage.getItem("token");
    if (token != null){
        
        fetch('http://instagrama.pt/api/profile', {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
    
        }).then(res => res.json())
            .then(res => showProfile(res));
    
    }
}

function showProfile(res){
    document.getElementById("Name_User").innerText = "@"+ res.user.username;
    document.getElementById("Name_User2").innerText = res.user.username;
    document.getElementById("blah").src = res.user.avatar;
    document.getElementById("blah2").src = res.user.avatar;

}

function updateAvatar() {
    var token = localStorage.getItem("token");
    const fileInput = document.querySelector('#inputFile');
    const formData = new FormData();

    formData.append('avatar', fileInput.files[0]);

    const options = {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + token
        }
        // If you add this, upload won't work
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // }
    };

    fetch('https://instagrama.pt/api/updateAvatar', options);
}

function getUserById(){

   
    var username = document.getElementById("username").value;
    var token = localStorage.getItem("token");

    if (token != null){
        fetch('http://instagrama.pt/api/searchUsername/'+username, {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json())
            .then(res => showUsers(res));
    }

}

function keydown (e){
    if(e.keyCode===13){
      document.getElementById('search').blur();
    }
    console.info(e.keyCode);
    
  
  }
  function load(){
    document.getElementById('search').addEventListener("keydown",keydown);
    
  }

  function getUserByUsername(){
    var username = document.getElementById("username").value;
    var token = localStorage.getItem("token");

    if (token != null){
        fetch('http://instagrama.pt/api/searchUsername/'+username, {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json())
            .then(res => showUsers(res));
    }

}

function showUsers(res){

    document.getElementById("list").innerHTML="";

    for (let i = 0; i < res.users.length; i++) {
        
        var a = document.createElement('a');
        var br = document.createElement('br');


        a.innerText = res.users[i].username;
        
        document.getElementById("list").appendChild(a);
        document.getElementById("list").appendChild(br);
    }

}

function updateAvatar() {
    var token = localStorage.getItem("token");
    const fileInput = document.querySelector('#inputFile');
    const formData = new FormData();

    formData.append('avatar', fileInput.files[0]);

    const options = {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    fetch('https://instagrama.pt/api/updateAvatar', options);
}

function changeimg(){
    inputFile.onchange = evt => {
    const [file] = inputFile.files
    if (file) {
      blah.src = URL.createObjectURL(file)
    }
  }

}