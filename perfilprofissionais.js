
const cardsContainer = document.getElementById("cardsContainer");
let profissionais = [];

async function carregarDados() {
  try {
    const resposta = await fetch("perfilprofissionais.json");
    const dadosJSON = await resposta.json();
    profissionais = dadosJSON;

    const novosProfissionais = JSON.parse(localStorage.getItem("formData")) || [];
    if (Array.isArray(novosProfissionais)) {
  profissionais.push(...novosProfissionais);
} else if (novosProfissionais && typeof novosProfissionais === "object") {

  profissionais.push(novosProfissionais);
}



    if (novoProfissionalStr) {
      try {
        const novoProfissional = JSON.parse(novoProfissionalStr);
        profissionais.push(novoProfissional); 
      } catch (e) {
        console.warn("Erro ao parsear formData do localStorage:", e);
      }
    }

    localStorage.setItem("profissionais", JSON.stringify(profissionais));

    renderizarCards(profissionais);
  } catch (erro) {
    console.error("Erro ao carregar perfilprofissionais.json:", erro);
    cardsContainer.innerHTML = "<p>Erro ao carregar dados. Tente novamente mais tarde.</p>";
  }
}


/*VERSÃO FUNCIONAL async function carregarDados() {
  try {
    const resposta = await fetch("perfilprofissionais.json");
    const dadosJSON = await resposta.json();
    profissionais = dadosJSON;


    // Garante localStorage sincronizado, caso queira usar futuramente
    localStorage.setItem("profissionais", JSON.stringify(profissionais));

    profissionais += localStorage.getItem('formData');


    renderizarCards(profissionais);
  } catch (erro) {
    console.error("Erro ao carregar perfilprofissionais.json:", erro);
    cardsContainer.innerHTML = "<p>Erro ao carregar dados. Tente novamente mais tarde.</p>";
  }
}*/

function renderizarCards(lista) {
  cardsContainer.innerHTML = "";
  if (lista.length === 0) {
    cardsContainer.innerHTML = "<p>Nenhum profissional encontrado com os filtros selecionados.</p>";
    return;
  }

  lista.forEach(p => {
    const card = document.createElement("section");
    card.className = "profile-card";

    const whatsappLink = `https://wa.me/${p.telefone.replace(/\D/g, '')}?text=Olá%20${encodeURIComponent(p.nome)},%20vim%20pelo%20site%20Escuta%20Amiga.`;
    const emailLink = `mailto:${p.email}?subject=Contato%20via%20Escuta%20Amiga`;

    card.innerHTML = `
      <h2>${p.nome}</h2>
      <p>${p.descricao}</p>
      <button onclick="toggleDetails(this)">Ver mais</button>
      <div class="details" style="display:none;">
        <p><strong>Email:</strong> <a href="${emailLink}">${p.email}</a></p>
        <p><strong>Telefone:</strong> <a href="${whatsappLink}" target="_blank">${p.telefone}</a></p>
        <p><strong>Estado:</strong> ${p.estado}</p>
        <p><strong>Serviço:</strong> ${traduzirServico(p.servico)}</p>
        <a class="contact-btn" href="${whatsappLink}" target="_blank">Entrar em Contato</a>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}

function traduzirServico(servico) {
  const mapa = {
    advocacia: "Advocacia",
    psicologia: "Psicologia",
    abrigo: "Abrigo Temporário",
    assistencia_social: "Assistência Social",
    acolhimento: "Acolhimento Emocional",
    medicina: "Atendimento Médico",
    educacao: "Educação e Conscientização",
    orientacao_juridica: "Orientação Jurídica"
  };
  return mapa[servico] || servico;
}

function toggleDetails(button) {
  const details = button.nextElementSibling;
  const isOpen = details.style.display === "block";
  details.style.display = isOpen ? "none" : "block";
  button.textContent = isOpen ? "Ver mais" : "Ver menos";
}

function aplicarFiltro() {
  const estado = document.getElementById("filtroEstado").value;
  const servico = document.getElementById("filtroServico").value;

  const filtrado = profissionais.filter(p =>
    (estado === "" || p.estado === estado) &&
    (servico === "" || p.servico === servico)
  );

  renderizarCards(filtrado);
}

const STORAGE_KEY = "denuncias";

const denunciasIniciais = [
  { id: 1, tipo: "Violência Física", estado: "Pendente", data: "2025-05-15", orgao: "Polícia", motivo: "Falta de provas", proximosPassos: "Aguardando resposta", comentarios: "Nenhum comentário no momento." },
  { id: 2, tipo: "Violência Psicológica", estado: "Em análise", data: "2025-05-14", orgao: "Delegacia da Mulher", motivo: "Recusa da vítima", proximosPassos: "Contato com vítima", comentarios: "Contato agendado." },
  { id: 3, tipo: "Violência Sexual", estado: "Pendente", data: "2025-05-13", orgao: "Polícia", motivo: "Investigação em andamento", proximosPassos: "Coleta de provas", comentarios: "Testemunhas aguardando depoimento." },
  { id: 4, tipo: "Violência Patrimonial", estado: "Pendente", data: "2025-05-12", orgao: "Delegacia", motivo: "Documento incompleto", proximosPassos: "Contato com vítima", comentarios: "Sem novos comentários." },
  { id: 5, tipo: "Violência Moral", estado: "Encerrada", data: "2025-05-11", orgao: "Conselho Tutelar", motivo: "Caso arquivado", proximosPassos: "Nenhum", comentarios: "Denúncia arquivada por falta de provas." },
  { id: 6, tipo: "Violência Física", estado: "Em análise", data: "2025-05-10", orgao: "Polícia", motivo: "Aguardando perícia", proximosPassos: "Perícia agendada", comentarios: "Perícia marcada para próxima semana." },
  { id: 7, tipo: "Violência Psicológica", estado: "Pendente", data: "2025-05-09", orgao: "Delegacia da Mulher", motivo: "Vítima não compareceu", proximosPassos: "Tentativa de contato", comentarios: "Tentativa de contato realizada." },
  { id: 8, tipo: "Violência Sexual", estado: "Pendente", data: "2025-05-08", orgao: "Polícia", motivo: "Falta de testemunhas", proximosPassos: "Aguardando testemunhas", comentarios: "Nenhum comentário adicional." }
];

function carregarDenuncias() {
  const data = JSON.parse(localStorage.getItem("denuncias")) || [];
  if (!data) {
    salvarDenuncias(denunciasIniciais);
    return [...denunciasIniciais];
  }
  return JSON.parse(data);
}

function salvarDenuncias(denuncias) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(denuncias));
}

function atualizarLista() {
  const lista = document.getElementById("lista-denuncias");
  if (!lista) return;

  const denuncias = carregarDenuncias();
  lista.innerHTML = "";

  denuncias.forEach(denuncia => {
    const div = document.createElement("div");
    div.className = "topico";
    div.innerHTML = `
      <h3>${denuncia.violencia}</h3>
      <p>${denuncia.comentarios.length > 50 ? denuncia.comentarios.slice(0, 50) + "..." : denuncia.comentarios}</p>
      <button onclick="verDetalhes(${denuncia.id})">Comentar</button>
    `;
    lista.appendChild(div);
  });

  criarGrafico();
}

function verDetalhes(id) {
  localStorage.setItem("denunciaSelecionada", id);
  window.location.href = "denunciasNaoAtendidas.html"; 
}

function criarGrafico() {
  const canvas = document.getElementById('graficoPizza');
  if (!canvas) return;

  const denuncias = carregarDenuncias();
  const contagemTipos = {};

  denuncias.forEach(d => {
    contagemTipos[d.violencia] = (contagemTipos[d.violencia] || 0) + 1;
  });

  const labels = Object.keys(contagemTipos);
  const data = Object.values(contagemTipos);
  const ctx = canvas.getContext('2d');

  if (window.graficoAtual) window.graficoAtual.destroy();

  window.graficoAtual = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ['#fb7ec1', '#ff9f89', '#6a67ce', '#f3c623', '#3caea3'],
        borderColor: 'white',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { size: 14 },
            color: '#333'
          }
        }
      }
    }
  });
}


function carregarDetalhesDenuncia() {
  const idSelecionado = localStorage.getItem("denunciaSelecionada");
  if (!idSelecionado) {
    alert("Nenhuma denúncia selecionada.");
    window.location.href = "perfilprofissionais.html"; 
    return;
  }

  const denuncias = carregarDenuncias();
  const denuncia = denuncias.find(d => d.id === parseInt(idSelecionado));

  if (!denuncia) {
    alert("Denúncia não encontrada.");
    window.location.href = "perfilprofissionais.html";
    return;
  }


  document.getElementById("tipoViolencia").value = denuncia.tipo;
  document.getElementById("estadoDenuncia").value = denuncia.estado;
  document.getElementById("dataEnvio").value = denuncia.data;
  document.getElementById("orgao").value = denuncia.orgao;
  document.getElementById("motivo").value = denuncia.motivo;
  document.getElementById("proximosPassos").value = denuncia.proximosPassos;
  document.getElementById("comentarios").value = denuncia.comentarios;

  const form = document.getElementById("formDenuncia");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    denuncia.tipo = document.getElementById("tipoViolencia").value;
    denuncia.estado = document.getElementById("estadoDenuncia").value;
    denuncia.data = document.getElementById("dataEnvio").value;
    denuncia.orgao = document.getElementById("orgao").value;
    denuncia.motivo = document.getElementById("motivo").value;
    denuncia.proximosPassos = document.getElementById("proximosPassos").value;
    denuncia.comentarios = document.getElementById("comentarios").value;

    salvarDenuncias(denuncias);

    alert("Denúncia atualizada com sucesso!");
    window.location.href = "perfilprofissionais.html"; 
  });

  const btnResolver = document.getElementById("resolver");
  btnResolver.addEventListener("click", () => {
    denuncia.estado = "Encerrada";
    document.getElementById("estadoDenuncia").value = "Encerrada";

    salvarDenuncias(denuncias);
    alert("Denúncia marcada como resolvida.");
    window.location.href = "perfilprofissionais.html"; 
  });
}


document.addEventListener("DOMContentLoaded", () => {
  
  if (cardsContainer) {
    carregarDados();
  }

  if (document.getElementById("lista-denuncias")) {
    atualizarLista();
  }

  if (document.getElementById("graficoPizza")) {
    criarGrafico();
  }

  if (document.getElementById("formDenuncia")) {
    carregarDetalhesDenuncia();
  }
});