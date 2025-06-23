document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    const denunciante = JSON.parse(localStorage.getItem('denunciante'));

    if (
      denunciante &&
      (login === denunciante.email || login === denunciante.usuario) &&
      senha === denunciante.senha
    ) {
      alert('Login realizado com sucesso!');
      const usuarioCorrente = denunciante;
      sessionStorage.setItem('usuarioCorrente', JSON.stringify(denunciante));
      
      
      window.location.href = 'inicio.html'; 
    } else {
      alert('Usuário ou senha incorretos!');
    }
  });
});
