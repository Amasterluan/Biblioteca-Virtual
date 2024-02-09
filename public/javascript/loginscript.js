var botao = document.getElementById("botao");

botao.onclick = () => {
    ValidarEmail();
    ValidarSenha();
};

//Validação de E-mail
function ValidarEmail() {
    var email = document.getElementById("email").value.trim();

    if (email === "") {
        alert("O email não informado!");
        return;
    }

    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(email)) {
        alert("O email não é válido.");
        return;
    }

    alert("E-mail está okay");
};

// Validação de Senha
function ValidarSenha() {
    var senha = document.getElementById("senha").value;

    if(senha === ""){
        alert("Senha não informado!")
        return;
    }
    if (senha.length < 8) {
        alert("A senha deve conter mais de 8 caracteres");
        return;
    }

    alert("Senha está okay")
};