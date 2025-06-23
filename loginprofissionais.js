const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailInput = document.querySelector('#email').value;
    const passwordInput = document.querySelector('#password').value;

   
    const savedData = localStorage.getItem('formData');

    if (!savedData) {
        
        alert('Nenhum usuário cadastrado. Redirecionando para a página de cadastro.');
        window.location.href = 'cadastroprofissionais.html';
        return;
    }

    const formData = JSON.parse(savedData);

    formData.forEach(profissional => {
         if (profissional.email === emailInput && profissional.password === passwordInput) {
        alert('Login bem-sucedido!');
        const usuarioCorrente = profissional;
        sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
        
        window.location.href = 'inicio.html';
    } else {
        alert('Email ou senha incorretos.');
    }
});
        
    });
    
