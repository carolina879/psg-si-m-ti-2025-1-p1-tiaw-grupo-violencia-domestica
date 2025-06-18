const form = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  fetch("/usuarios")
    .then((response) => response.json())
    .then((users) => {
      const user = users.find(
        (u) =>
          u.email === emailInput.value && u.password === passwordInput.value
      );
      if (user) {
        alert("Login realizado com sucesso!");
        // Redirecione para a página desejada após o login
        window.location.href = "dashboard.html";
      } else {
        alert("E-mail ou senha incorretos.");
      }
    })
    .catch((error) => {
      alert("Erro de conexão.");
      console.error(error);
    });
});

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const emailInput = document.querySelector("#email").value;
  const passwordInput = document.querySelector("#password").value;

  // Recuperar os dados salvos no localStorage
  const savedData = localStorage.getItem("formData");

  if (!savedData) {
    // Redirecionar para a página de cadastro se não houver dados
    alert(
      "Nenhum usuário cadastrado. Redirecionando para a página de cadastro."
    );
    window.location.href = "cadastroprofissionais.html";
    return;
  }

  const formData = JSON.parse(savedData);

  // Validar email e senha
  if (formData.email === emailInput && formData.password === passwordInput) {
    alert("Login bem-sucedido!");
    // Redirecionar para a página principal ou dashboard
    window.location.href = "dashboard.html";
  } else {
    alert("Email ou senha incorretos.");
  }
});
