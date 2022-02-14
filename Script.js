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
  
 /* function counter(x){
    x = 1
    h2.text(x)
    x = x +1;
    }
  */
    function checkLogin(res) {
        console.log(res)
        if (res.token != null) {
            alert("Login com sucesso!");
            localStorage.setItem("token", res.token); 
            location.replace("index.html");
        }
        else {
            alert("Erro!");
        }
    }


  function getProfile(){
    var token = localStorage.getItem("token");

    if (token != null){
        fetch('https://www.instagram.com/api/profile', {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json())
            .then(res => console.log(res));
    }

}

