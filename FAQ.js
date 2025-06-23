
const dadosFAQ = [
  {
    pergunta: "Como posso fazer uma denúncia anônima?",
    resposta: "Você pode preencher nosso formulário principal. Seus dados não são armazenados e o envio é 100% anônimo."
  },
  {
    pergunta: "Quem recebe minha denúncia?",
    resposta: "As denúncias são direcionadas automaticamente aos órgãos competentes da sua região, conforme o conteúdo."
  },
  {
    pergunta: "Tenho apoio jurídico gratuito?",
    resposta: "Sim. Contamos com advogados voluntários que prestam orientações de forma gratuita e segura."
  },
  {
    pergunta: "Como funciona o botão de disfarce?",
    resposta: "Ao clicar, o site se transforma para parecer uma página comum de notícias, protegendo sua navegação."
  },
  {
    pergunta: "Posso ler histórias de outras vítimas?",
    resposta: "Sim, na seção de Informativos você encontra relatos reais enviados de forma anônima por outras pessoas."
  }
];

function inicializarFAQ() {
  carregarFAQ();
  carregarPerguntasComunidade();
}

function carregarFAQ() {
  const container = document.getElementById("faq-container");
  container.innerHTML = "";

  dadosFAQ.forEach((item, index) => {
    const perguntaDiv = document.createElement("div");
    perguntaDiv.className = "faq-item";
    perguntaDiv.innerHTML = `
      <div class="pergunta" onclick="toggleResposta('faq-${index}')">
        <span>➕</span> ${item.pergunta}
      </div>
      <div class="resposta" id="faq-${index}" style="display: none;">
        ${item.resposta}
      </div>
    `;
    container.appendChild(perguntaDiv);
  });
}

function toggleResposta(id) {
  const resposta = document.getElementById(id);
  resposta.style.display = resposta.style.display === "none" ? "block" : "none";
}

function filtrarPerguntas() {
  const termo = document.getElementById("busca").value.toLowerCase();
  const container = document.getElementById("faq-container");
  container.innerHTML = "";

  const filtradas = dadosFAQ.filter(item =>
    item.pergunta.toLowerCase().includes(termo) ||
    item.resposta.toLowerCase().includes(termo)
  );

  if (filtradas.length === 0) {
    container.innerHTML = "<p>Nenhuma pergunta encontrada.</p>";
    return;
  }

  filtradas.forEach((item, index) => {
    const perguntaDiv = document.createElement("div");
    perguntaDiv.className = "faq-item";
    perguntaDiv.innerHTML = `
      <div class="pergunta" onclick="toggleResposta('filtro-${index}')">
        <span>➕</span> ${item.pergunta}
      </div>
      <div class="resposta" id="filtro-${index}" style="display: none;">
        ${item.resposta}
      </div>
    `;
    container.appendChild(perguntaDiv);
  });
}

function enviarPergunta(event) {
  event.preventDefault();
  const novaPergunta = document.getElementById("novaPergunta").value.trim();
  if (!novaPergunta) return;

  let perguntas = JSON.parse(localStorage.getItem("perguntasComunidade")) || [];
  perguntas.push({ pergunta: novaPergunta, data: new Date().toISOString() });
  localStorage.setItem("perguntasComunidade", JSON.stringify(perguntas));

  alert("Pergunta enviada com sucesso!");
  document.getElementById("form-pergunta").reset();
  carregarPerguntasComunidade();
}

function carregarPerguntasComunidade() {
  const perguntas = JSON.parse(localStorage.getItem("perguntasComunidade")) || [];
  const container = document.getElementById("lista-comunidade");
  container.innerHTML = "";

  if (perguntas.length === 0) {
    container.innerHTML = "<p>Nenhuma pergunta da comunidade ainda.</p>";
    return;
  }

  perguntas.slice().reverse().forEach((item, i) => {
    const indexOriginal = perguntas.length - 1 - i;

    const div = document.createElement("div");
    div.className = "faq-item";

    let html = `<div class="pergunta"><span>❓</span> ${item.pergunta}</div>`;

    if (item.resposta) {
      html += `<div class="resposta-comunidade">${item.resposta}</div>`;
    } else {
      html += `
        <textarea placeholder="Responder..." rows="3" class="campo-resposta"></textarea>
        <div class="botoes-comunidade">
          <button class="responder" onclick="responderPergunta(${indexOriginal}, this)">Responder</button>
          <button class="editar" onclick="editarPergunta(${indexOriginal})">Editar</button>
          <button class="excluir" onclick="excluirPergunta(${indexOriginal})">Excluir</button>
          <button class="adicionar-faq" onclick="adicionarAoFAQ(${indexOriginal})">Adicionar ao FAQ</button>
        </div>
      `;
    }

    div.innerHTML = html;
    container.appendChild(div);
  });
}

function responderPergunta(index, btn) {
  const textarea = btn.parentElement.previousElementSibling;
  const resposta = textarea.value.trim();
  if (!resposta) return alert("Digite uma resposta!");

  let perguntas = JSON.parse(localStorage.getItem("perguntasComunidade")) || [];
  perguntas[index].resposta = resposta;
  localStorage.setItem("perguntasComunidade", JSON.stringify(perguntas));

  carregarPerguntasComunidade();
}

function excluirPergunta(index) {
  if (!confirm("Tem certeza que deseja excluir esta pergunta?")) return;

  let perguntas = JSON.parse(localStorage.getItem("perguntasComunidade")) || [];
  perguntas.splice(index, 1);
  localStorage.setItem("perguntasComunidade", JSON.stringify(perguntas));

  carregarPerguntasComunidade();
}

function editarPergunta(index) {
  let perguntas = JSON.parse(localStorage.getItem("perguntasComunidade")) || [];
  const novaPergunta = prompt("Edite a pergunta:", perguntas[index].pergunta);
  if (novaPergunta) {
    perguntas[index].pergunta = novaPergunta.trim();
    localStorage.setItem("perguntasComunidade", JSON.stringify(perguntas));
    carregarPerguntasComunidade();
  }
}

function adicionarAoFAQ(index) {
  let perguntas = JSON.parse(localStorage.getItem("perguntasComunidade")) || [];
  const item = perguntas[index];

  if (!item.resposta) {
    alert("Você deve responder antes de adicionar ao FAQ.");
    return;
  }

  dadosFAQ.push({
    pergunta: item.pergunta,
    resposta: item.resposta
  });

  alert("Pergunta adicionada ao FAQ com sucesso!");
  carregarFAQ();
}

