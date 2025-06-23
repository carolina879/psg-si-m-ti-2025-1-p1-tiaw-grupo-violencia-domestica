document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('cadastroForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    const administrador = { nome, email, usuario, senha, 'adm' : true };
    localStorage.setItem('administrador', JSON.stringify(administrador));

    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html'; 
  });
});

