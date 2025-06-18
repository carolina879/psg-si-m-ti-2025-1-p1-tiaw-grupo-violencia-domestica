const form = document.querySelector('#form-simplificado');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (nameInput.value === "") {
        alert("Por favor, preencha seu nome.");
        return;
    }
    if (emailInput.value === "" || !isEmailValid(emailInput.value)) {
        alert("Por favor, preencha um e-mail válido.");
        return;
    }
    if (passwordInput.value.length < 8) {
        alert("A senha deve ter no mínimo 8 caracteres.");
        return;
    }

    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };

    fetch('/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            alert('Cadastro realizado com sucesso! Redirecionando para a página de login.');
            window.location.href = 'login.html';
        } else {
            alert('Erro ao cadastrar.');
        }
    })
    .catch(error => {
        alert('Erro de conexão.');
        console.error(error);
    });
});

function isEmailValid(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}