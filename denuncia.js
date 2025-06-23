
var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-0000';
  };
  
  var spOptions = {
    onKeyPress: function(val, e, field, options) {
      field.mask(SPMaskBehavior.apply({}, arguments), options);
    }
  };
  
  $(document).ready(function() {
    $('#inputTel').mask(SPMaskBehavior, spOptions);
  
    // Máscara para data
    /*$('#inputAddress2').mask('00/00/0000');
  
    // Validação da data
    $('#inputAddress2').on('blur', function () {
      const valor = $(this).val();
      const partes = valor.split('/');
      
      if (partes.length === 3) {
        const dia = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10) - 1;
        const ano = parseInt(partes[2], 10);
        
        const data = new Date(ano, mes, dia);
        
        if (
          data.getFullYear() !== ano ||
          data.getMonth() !== mes ||
          data.getDate() !== dia
        ) {
          alert('Data inválida. Por favor, digite uma data real (ex: 25/12/2025).');
          $(this).val('');
          $(this).focus();
        }
      }
    });*/
  });
  document.getElementById('formDenuncia1').addEventListener('submit', function (event) {
    event.preventDefault(); 
  
    const nome = document.getElementById('inputName').value.trim();
    const telefone = document.getElementById('inputTel').value.trim();
    const email = document.getElementById('inputEmail4').value.trim();
    const data = document.getElementById('inputAddress2').value.trim();
    const local = document.getElementById('inputCity').value.trim();
  
    
    if (!nome || !telefone || !email || !data || !local) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  
    const dados = {
      nome,
      telefone,
      email,
      data,
      local
    };

    localStorage.setItem('denunciaParte1', JSON.stringify(dados)); 
    window.location.href = "cadastro2.html";
  });

  function ContinuarPagina() {
    const titulo = document.getElementById('formTitulo').value.trim();
    const testemunhas = document.getElementById('formTestemunha').value.trim();
    const descricao = document.getElementById('formDescricao').value.trim();
    const espera = document.getElementById('formEspera').value.trim();
  
    const dadosParte2 = {
      titulo,
      testemunhas,
      descricao,
      espera
    };
  
    localStorage.setItem('denunciaParte2', JSON.stringify(dadosParte2));
    window.location.href = 'cadastro3.html';
  }
  
  function voltarPagina() {
    window.location.href = 'cadastro1.html';
  }

  document.getElementById('formFinal').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const arquivo = document.getElementById('inputFile').value;
    const confirmado = document.getElementById('checkboxConfirmacao').checked;
  
    if (!confirmado) {
      alert('Você precisa confirmar que as informações são verdadeiras.');
      return;
    }
  
    const dadosParte3 = {
      arquivo,
      confirmado
    };
  
    localStorage.setItem('denunciaParte3', JSON.stringify(dadosParte3));
  
    const parte1 = JSON.parse(localStorage.getItem('denunciaParte1'));
    const parte2 = JSON.parse(localStorage.getItem('denunciaParte2'));
    const parte3 = JSON.parse(localStorage.getItem('denunciaParte3'));
  
    const denunciaCompleta = {
      ...parte1,
      ...parte2,
      ...parte3
    };
  
    console.log('Denúncia completa:', denunciaCompleta);
  
    alert('Denúncia enviada com sucesso!');
  });


  function VoltarPagina() {
    window.location.href = "cadastro1.html"; 
  }
  
  function ContinuarPagina() {
    window.location.href = "cadastro3.html"; 
  }