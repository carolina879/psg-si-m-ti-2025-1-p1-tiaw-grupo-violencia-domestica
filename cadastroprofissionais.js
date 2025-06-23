const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageTextarea = document.querySelector('#message');   
const jobSelect = document.querySelector('#job');  
const passwordInput = document.querySelector('#password');
const telefoneInput = document.querySelector('#tel');
const estadoInput = document.querySelector('#estado');

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
    if (jobSelect.value === "") {
        alert("Por favor, selecione sua ocupação.");
        return;
    }
    if (messageTextarea.value === "") {
        alert("Por favor, digite uma breve descrição sobre sua ocupação.");
        return;
    }

    const novoProfissional = {
        nome: nameInput.value,
        email: emailInput.value,
        telefone: telefoneInput.value,
        estado: estadoInput.value,
        password: passwordInput.value,
        servico: jobSelect.value,
        descricao: messageTextarea.value,
        adm: false
    };

    console.log("Profissional cadastrado:", novoProfissional);

    const dadosExistentes = JSON.parse(localStorage.getItem("formData")) || [];

    dadosExistentes.push(novoProfissional);

    localStorage.setItem("formData", JSON.stringify(dadosExistentes));

    alert('Cadastro realizado com sucesso! Redirecionando para a página de login.');
    window.location.href = 'login.html';
});

function isEmailValid(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validatePassword(password, minDigits) {
    return password.length >= minDigits;
}



/* FUNCIONAL RELATIVAMENTE const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageTextarea = document.querySelector('#message');   
const jobSelect = document.querySelector('#job');  
const passwordInput = document.querySelector('#password');
const telefoneInput = document.querySelector('#tel');
const estadoInput = document.querySelector('#estado');

form.addEventListener("submit", (event) => {

    event.preventDefault();

    if (nameInput.value === "" ) { 
        alert("Por favor, preencha seu nome.");
        return;
    }
    if (emailInput.value === "" || !isEmailValid(emailInput.value )) { 
        alert("Por favor, preencha seu e-mail (utilize um e-mail válido)"); 
        return;
    }

    if (!validatePassword(passwordInput.value, 8)) {
        alert("Por favor, utilize uma senha com no mínimo 8 dígitos.");   
        return;

    }


    if (jobSelect.value === "" ) { 
        alert("Por favor, selecione sua ocupação.");
        return;
    }
    
    if (messageTextarea.value === "" ) { 
        alert("Por favor, digite uma breve descrição sobre sua ocupação");
         return;
    }
    


    const formData = {
        nome: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        servico: jobSelect.value,
        descricao: messageTextarea.value,
        adm: false
    };

    console.log("Dados do formulário:", formData);

    localStorage.setItem("formData", JSON.stringify(formData)); 

     
    form.submit();  

}); 
 
function isEmailValid(email) {
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
    );
    
    if(emailRegex.test(email)) {
        return true;
    }
    return false;

} 

function validatePassword(password, minDigits) {
  if (password.length >= minDigits) {
      
        return true;
    }
    
    return false; 
}

const savedData = localStorage.getItem("formData");
if (savedData) {
    const formData = JSON.parse(savedData);
    console.log("Dados recuperados:", formData);
}
        form.addEventListener("submit", (event) => {
        event.preventDefault();
    
        // ... validações e salvamento no localStorage ...
    
        alert('Cadastro realizado com sucesso! Redirecionando para a página de login.');
        window.location.href = 'login.html';
    }) ;*/
        

  



