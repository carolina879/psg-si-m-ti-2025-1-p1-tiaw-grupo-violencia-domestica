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

    const denunciante = { nome, email, usuario, senha, 'adm' : false };
    localStorage.setItem('denunciante', JSON.stringify(denunciante));

    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html'; 
  });
});

