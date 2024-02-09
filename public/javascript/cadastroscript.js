var botao = document.getElementById("botao");

botao.onclick = () => {
    ValidarNome();
    ValidarEmail();
    ValidarCPF();
    ValidarSenha();
};

// Validação de Nome
function ValidarNome() {
    var nome = document.getElementById("nome").value;

    if(nome === ""){
        alert("Nome não informado!")
        return;
    }
    if (nome.length < 3) {
        alert("Nome muito curto!");
        return;
    }

    var specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    if (specialCharacters.test(nome)) {
        alert("O nome não deve conter caracteres especiais.");
        return;
    }

    alert("Nome está okay")
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

// Validação de CPF
function ValidarCPF() {
    var strCPF = document.getElementById("cpf").value.replace(/\D/g, ''); // Remover caracteres não numéricos
    var Soma = 0;
    var Resto;
    
    if (strCPF.length !== 11 || strCPF === "00000000000") {
        alert("CPF Inválido");
        return;
    }

    // Primeira parte da validação
    for (var i = 1; i <= 9; i++) {
        Soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    }
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) {
        Resto = 0;
    }
    if (Resto !== parseInt(strCPF.substring(9, 10))) {
        alert("CPF Inválido");
        return;
    }

    // Segunda parte da validação
    Soma = 0;
    for (var i = 1; i <= 10; i++) {
        Soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    }
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) {
        Resto = 0;
    }
    if (Resto !== parseInt(strCPF.substring(10, 11))) {
        alert("CPF Inválido");
        return;
    }

    alert("CPF está okay");
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