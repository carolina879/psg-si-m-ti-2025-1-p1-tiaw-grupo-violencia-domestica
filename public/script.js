const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const aboutSelect = document.querySelector('#about');
const addressInput = document.querySelector('#address');
const messageTextarea = document.querySelector('#message');

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (nameInput.value === "") { 
        alert("Por favor, preencha seu nome.");
        return;
    }
    if (emailInput.value === "" || !isEmailValid(emailInput.value)) { 
        alert("Por favor, preencha seu e-mail (utilize um e-mail válido)"); 
        return;
    }
    if (!validatePassword(passwordInput.value, 8)) {
        alert("Por favor, utilize uma senha com no mínimo 8 dígitos.");   
        return;
    }
    if (aboutSelect.value === "") { 
        alert("Por favor, selecione uma opção em 'Sobre você'.");
        return;
    }
    if (addressInput.value === "") {
        alert("Por favor, preencha seu endereço.");
        return;
    }
    if (messageTextarea.value === "") { 
        alert("Por favor, digite uma breve descrição.");
        return;
    }
    
    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        about: aboutSelect.value,
        address: addressInput.value,
        message: messageTextarea.value
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

function validatePassword(password, minDigits) {
    return password.length >= minDigits;
}


