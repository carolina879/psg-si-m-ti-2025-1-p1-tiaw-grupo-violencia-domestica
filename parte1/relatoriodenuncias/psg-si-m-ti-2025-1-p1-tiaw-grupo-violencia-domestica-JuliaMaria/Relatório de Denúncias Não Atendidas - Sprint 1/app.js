const STORAGE_KEY = "denunciasEscutaAmiga";

// Dados iniciais
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

// Carrega do localStorage ou inicializa
function carregarDenuncias() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [...denunciasIniciais];
}

// Salva no localStorage
function salvarDenuncias(denuncias) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(denuncias));
}

document.addEventListener("DOMContentLoaded", () => {
  if (location.pathname.includes("index.html")) {
    atualizarLista();
    criarGrafico();
  }

  if (location.pathname.includes("detalhes.html")) {
    carregarDetalhes();
    document.getElementById("formDenuncia").addEventListener("submit", salvarEdicao);
    document.getElementById("resolver").addEventListener("click", marcarComoResolvida);
  }
});

function atualizarLista() {
  const lista = document.getElementById("lista-denuncias");
  const denuncias = carregarDenuncias();
  lista.innerHTML = "";

  denuncias.forEach(denuncia => {
    const div = document.createElement("div");
    div.className = "topico";
    div.innerHTML = `
      <h3>${denuncia.tipo}</h3>
      <p>${denuncia.comentarios.length > 50 ? denuncia.comentarios.slice(0, 50) + "..." : denuncia.comentarios}</p>
      <button onclick="verDetalhes(${denuncia.id})">Comentar</button>
    `;
    lista.appendChild(div);
  });

  criarGrafico();
}

function verDetalhes(id) {
  localStorage.setItem("denunciaSelecionada", id);
  window.location.href = "detalhes.html";
}

function carregarDetalhes() {
  const id = parseInt(localStorage.getItem("denunciaSelecionada"));
  const denuncias = carregarDenuncias();
  const denuncia = denuncias.find(d => d.id === id);

  if (!denuncia) {
    alert("Denúncia não encontrada.");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("tipoViolencia").value = denuncia.tipo;
  document.getElementById("estadoDenuncia").value = denuncia.estado;
  document.getElementById("dataEnvio").value = denuncia.data;
  document.getElementById("orgao").value = denuncia.orgao;
  document.getElementById("motivo").value = denuncia.motivo;
  document.getElementById("proximosPassos").value = denuncia.proximosPassos;
  document.getElementById("comentarios").value = denuncia.comentarios;
}

function salvarEdicao(event) {
  event.preventDefault();
  const id = parseInt(localStorage.getItem("denunciaSelecionada"));
  const denuncias = carregarDenuncias();
  const denuncia = denuncias.find(d => d.id === id);

  if (!denuncia) return alert("Denúncia não encontrada.");

  denuncia.tipo = document.getElementById("tipoViolencia").value;
  denuncia.estado = document.getElementById("estadoDenuncia").value;
  denuncia.data = document.getElementById("dataEnvio").value;
  denuncia.orgao = document.getElementById("orgao").value;
  denuncia.motivo = document.getElementById("motivo").value;
  denuncia.proximosPassos = document.getElementById("proximosPassos").value;
  denuncia.comentarios = document.getElementById("comentarios").value;

  salvarDenuncias(denuncias);
  alert("Denúncia salva com sucesso!");
}

function marcarComoResolvida() {
  const id = parseInt(localStorage.getItem("denunciaSelecionada"));
  let denuncias = carregarDenuncias();
  const index = denuncias.findIndex(d => d.id === id);

  if (index === -1) return alert("Denúncia não encontrada.");

  if (confirm("Deseja realmente marcar esta denúncia como resolvida?")) {
    denuncias.splice(index, 1);
    salvarDenuncias(denuncias);
    alert("Denúncia resolvida e removida da lista.");
    localStorage.removeItem("denunciaSelecionada");
    window.location.href = "index.html";
  }
}

function criarGrafico() {
  const canvas = document.getElementById('graficoPizza');
  if (!canvas) return;

  const denuncias = carregarDenuncias();
  const contagemTipos = {};
  denuncias.forEach(d => {
    contagemTipos[d.tipo] = (contagemTipos[d.tipo] || 0) + 1;
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
