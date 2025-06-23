console.log('app.js carregado e executando');

const questionario = {
  titulo: "Avaliação: Será que estou em um relacionamento abusivo?",
  descricao: "Responda sinceramente às perguntas abaixo para identificar possíveis sinais de abuso ou toxicidade.",
  perguntas: [
    {
       id: 1,
          texto: "Seu parceiro(a) controla com quem você fala ou onde você vai?",
          opcoes: [
            { texto: "Nunca", valor: 0 },
            { texto: "Raramente", valor: 1 },
            { texto: "Às vezes", valor: 2 },
            { texto: "Frequentemente", valor: 3 },
            { texto: "Sempre", valor: 4 }
          ]
        },
        {
          id: 2,
          texto: "Você sente medo da reação do seu parceiro(a)?",
          opcoes: [
            { texto: "Nunca", valor: 0 },
            { texto: "Raramente", valor: 1 },
            { texto: "Às vezes", valor: 2 },
            { texto: "Frequentemente", valor: 3 },
            { texto: "Sempre", valor: 4 }
          ]
        },
        {
          id: 3,
          texto: "Seu parceiro(a) tenta te afastar de amigos ou familiares?",
          opcoes: [
            { texto: "Nunca", valor: 0 },
            { texto: "Raramente", valor: 1 },
            { texto: "Às vezes", valor: 2 },
            { texto: "Frequentemente", valor: 3 },
            { texto: "Sempre", valor: 4 }
          ]
        },
        {
          id: 4,
          texto: "Você sente que está sempre pisando em ovos perto do seu parceiro(a)?",
          opcoes: [
            { texto: "Nunca", valor: 0 },
            { texto: "Raramente", valor: 1 },
            { texto: "Às vezes", valor: 2 },
            { texto: "Frequentemente", valor: 3 },
            { texto: "Sempre", valor: 4 }
          ]
        },
        {
          id: 5,
          texto: "Seu parceiro(a) já te ofendeu, humilhou ou te fez sentir menos capaz?",
          opcoes: [
            { texto: "Nunca", valor: 0 },
            { texto: "Raramente", valor: 1 },
            { texto: "Às vezes", valor: 2 },
            { texto: "Frequentemente", valor: 3 },
            { texto: "Sempre", valor: 4 }
          ]
        },
        {
          id: 6,
          texto: "Seu parceiro(a) já te impediu de estudar, trabalhar ou seguir seus planos?",
          opcoes: [
            { texto: "Nunca", valor: 0 },
            { texto: "Raramente", valor: 1 },
            { texto: "Às vezes", valor: 2 },
            { texto: "Frequentemente", valor: 3 },
            { texto: "Sempre", valor: 4 }
          ]
        },
        {
          id: 7,
          texto: "Você sente que não pode ser você mesmo(a) no relacionamento?",
          opcoes: [
            { texto: "Nunca", valor: 0 },
            { texto: "Raramente", valor: 1 },
            { texto: "Às vezes", valor: 2 },
            { texto: "Frequentemente", valor: 3 },
            { texto: "Sempre", valor: 4 }
          ]
        },
        {
          id: 8,
          texto: "Seu parceiro(a) já ameaçou ou usou violência física ou sexual?",
          opcoes: [
            { texto: "Nunca", valor: 0 },
            { texto: "Raramente", valor: 1 },
            { texto: "Às vezes", valor: 2 },
            { texto: "Frequentemente", valor: 3 },
            { texto: "Sempre", valor: 4 }
          ]
        }
      ],
  avaliacao: [
    { limite: 7, mensagem: "Seu relacionamento parece saudável. Continue atento(a) a sinais sutis e mantenha a comunicação aberta." },
    { limite: 15, mensagem: "Existem alguns sinais de alerta. Reflita sobre seu relacionamento e converse com alguém de confiança." },
    { limite: 23, mensagem: "Há sinais moderados de abuso ou toxicidade. Procure apoio emocional ou orientação profissional." },
    { limite: 999, mensagem: "Alto risco de abuso. Busque ajuda especializada e priorize sua segurança." }
  ]
};

const tituloElem = document.getElementById('titulo');
const descricaoElem = document.getElementById('descricao');
const form = document.getElementById('formulario');
const avaliacaoElem = document.getElementById('avaliacao');
const resultadosElem = document.getElementById('resultados');
const btnEnviar = document.getElementById('btnEnviar');

tituloElem.innerText = questionario.titulo;
descricaoElem.innerText = questionario.descricao;

questionario.perguntas.forEach(pergunta => {
  const div = document.createElement('div');
  div.className = 'pergunta';

  const label = document.createElement('label');
  label.innerHTML = `<strong>${pergunta.texto}</strong>`;
  div.appendChild(label);

  pergunta.opcoes.forEach((opcao, idx) => {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `pergunta_${pergunta.id}`;
    input.value = opcao.valor;
    input.id = `p${pergunta.id}_o${idx}`;

    const lbl = document.createElement('label');
    lbl.setAttribute('for', input.id);
    lbl.style.marginLeft = '5px';
    lbl.innerText = opcao.texto;

    const br = document.createElement('br');

    div.appendChild(br);
    div.appendChild(input);
    div.appendChild(lbl);
  });

  form.appendChild(div);
});

function salvarRespostas(event) {
  event.preventDefault();

  const respostas = [];
  let pontuacaoTotal = 0;
  let todasRespondidas = true;

  questionario.perguntas.forEach(pergunta => {
    const resposta = document.querySelector(`input[name="pergunta_${pergunta.id}"]:checked`);
    if (!resposta) {
      todasRespondidas = false;
    } else {
      const valor = Number(resposta.value);
      respostas.push({ id: pergunta.id, resposta: valor });
      pontuacaoTotal += valor;
    }
  });

  if (!todasRespondidas) {
    alert("Por favor, responda todas as perguntas antes de enviar.");
    return;
  }

  let resultados = JSON.parse(localStorage.getItem('resultados')) || [];
  const avaliacao = questionario.avaliacao.find(a => pontuacaoTotal <= a.limite);

  const resultadoAtual = {
    data: new Date().toLocaleString(),
    respostas,
    pontuacaoTotal,
    mensagem: avaliacao.mensagem
  };

  resultados.push(resultadoAtual);
  localStorage.setItem('resultados', JSON.stringify(resultados));

  mostrarAvaliacao(resultadoAtual);
  mostrarResultados(resultados);

  form.reset();
}

function mostrarAvaliacao(resultado) {
  avaliacaoElem.style.display = 'block';
  avaliacaoElem.innerHTML = `
    <h3>Avaliação Atual</h3>
    <p><strong>Pontuação:</strong> ${resultado.pontuacaoTotal}</p>
    <p>${resultado.mensagem}</p>
    <p><small><em>${resultado.data}</em></small></p>
  `;
  avaliacaoElem.scrollIntoView({ behavior: 'smooth' });

}

function mostrarResultados(resultados) {
  resultadosElem.innerHTML = '';
 
  resultados.slice(-4).reverse().forEach((resultado, idx, arr) => {
    const card = document.createElement('div');
    card.className = 'card-resultado';


    const realIndex = resultados.length - 1 - idx;

    card.innerHTML = `
      <h5>Data: ${resultado.data}</h5>
      <p><strong>Pontuação:</strong> ${resultado.pontuacaoTotal}</p>
      <p>${resultado.mensagem}</p>
      <button class="btn btn-sm btn-danger btn-excluir-card" data-index="${realIndex}">Excluir</button>
    `;

    resultadosElem.appendChild(card);
  });

  document.querySelectorAll('.btn-excluir-card').forEach(btn => {
    btn.onclick = function() {
      const index = Number(this.getAttribute('data-index'));
      let resultados = JSON.parse(localStorage.getItem('resultados')) || [];
      resultados.splice(index, 1);
      localStorage.setItem('resultados', JSON.stringify(resultados));
      mostrarResultados(resultados);
    };
  });
}
form.addEventListener('submit', salvarRespostas);

mostrarResultados(JSON.parse(localStorage.getItem('resultados')) || []);
const btn = document.createElement('button');
btn.id = 'btnEnviar';
btn.type = 'submit';
btn.className = 'btn-personalizado';
btn.innerText = 'Enviar';

form.appendChild(btn);


