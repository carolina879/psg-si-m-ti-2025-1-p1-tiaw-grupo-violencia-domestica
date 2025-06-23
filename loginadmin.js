document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    const administrador = JSON.parse(localStorage.getItem('administrador'));

    if (
      administrador &&
      (login === administrador.email || login === administrador.usuario) &&
      senha === administrador.senha
    ) {
      alert('Login realizado com sucesso!');
      const usuarioCorrente = administrador;
      sessionStorage.setItem('usuarioCorrente', JSON.stringify(administrador));
      
      
      window.location.href = 'inicio.html'; 
    } else {
      alert('Usuário ou senha incorretos!');
    }
  });
});
