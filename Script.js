function register() {

    alert("Estás regitado acho eu");

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var Rpassword = document.getElementById("Rpassword").value;
    var username = document.getElementById("username").value; //formato ano-mes-dia

    if (password == Rpassword) {
        fetch('https://instagrama.pt/', {
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
