const cardsContainer = document.getElementById("cardsContainer");
let profissionais = [];


localStorage.removeItem("profissionais");


async function carregarDados() {
  try {
    const resposta = await fetch("profissionais.json");
    const dadosJSON = await resposta.json();
    profissionais = dadosJSON;
    renderizarCards(profissionais);
  } catch (erro) {
    console.error("Erro ao carregar profissionais.json:", erro);
    cardsContainer.innerHTML = "<p>Erro ao carregar dados. Tente novamente mais tarde.</p>";
  }
}

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
      <div class="details">
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

carregarDados();
