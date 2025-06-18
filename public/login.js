const form = document.querySelector('#login-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    fetch('/usuarios')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.email === emailInput.value && u.password === passwordInput.value);
            if (user) {
                alert('Login realizado com sucesso!');
                // Redirecione para a página desejada após o login
                window.location.href = 'dashboard.html';
            } else {
                alert('E-mail ou senha incorretos.');
            }
        })
        .catch(error => {
            alert('Erro de conexão.');
            console.error(error);
        });
});