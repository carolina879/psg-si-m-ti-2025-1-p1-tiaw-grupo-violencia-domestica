function carregarAtendimentos() {
  return JSON.parse(localStorage.getItem('atendimentos') || '[]');
}

function salvarAtendimento(atendimento) {
  const atendimentos = carregarAtendimentos();
  atendimentos.push(atendimento);
  localStorage.setItem('atendimentos', JSON.stringify(atendimentos));
}

function atualizarRelatorio() {
  const atendimentos = carregarAtendimentos();
  const relatorioEl = document.getElementById('relatorio');

  const contagem = {
    advogado: {},
    psicologo: {},
    ong: {}
  };

  atendimentos.forEach(a => {
    const tipo = a.tipoProfissional;
    const nome = a.nomeProfissional;
    if (!contagem[tipo][nome]) contagem[tipo][nome] = 0;
    contagem[tipo][nome]++;
  });

  function gerarRanking(titulo, dados, limite) {
    const lista = Object.entries(dados)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limite);

    if (lista.length === 0) return '';

    let html = `<h3>${titulo}</h3><ol>`;
    lista.forEach(([nome, total]) => {
      html += `<li>${nome} - ${total} atendimento(s)</li>`;
    });
    html += '</ol>';
    return html;
  }

  const html = `
    ${gerarRanking('Top 3 Advogados', contagem.advogado, 3)}
    ${gerarRanking('Top 3 Psicólogos', contagem.psicologo, 3)}
    ${gerarRanking('ONG com Mais Atendimentos', contagem.ong, 1)}
  `;

  relatorioEl.innerHTML = html || '<p>Nenhum atendimento registrado ainda.</p>';
}


function showTopProfessionals() {
  const timeFilter = document.getElementById('timeFilter').value;
  const typeFilter = document.getElementById('typeFilter').value;
  const atendimentos = carregarAtendimentos();
  const now = new Date();

  
  const filteredAtendimentos = atendimentos.filter(atendimento => {
    const atendimentoDate = new Date(atendimento.data); 
    switch (timeFilter) {
      case 'dia':
        return atendimentoDate.toDateString() === now.toDateString();
      case 'semana':
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        return atendimentoDate >= startOfWeek;
      case 'mes':
        return atendimentoDate.getMonth() === now.getMonth() && atendimentoDate.getFullYear() === now.getFullYear();
      case 'ano':
        return atendimentoDate.getFullYear() === now.getFullYear();
      default:
        return false;
    }
  });


  const filteredByType = typeFilter === 'todos'
    ? filteredAtendimentos
    : filteredAtendimentos.filter(atendimento => atendimento.tipoProfissional === typeFilter);

 
  const contagem = {};
  filteredByType.forEach(atendimento => {
    const nome = atendimento.nomeProfissional;
    if (!contagem[nome]) contagem[nome] = 0;
    contagem[nome]++;
  });

  
  const topProfessionals = Object.entries(contagem)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  
  const topProfessionalsList = document.getElementById('topProfessionalsList');
  topProfessionalsList.innerHTML = '';

  if (topProfessionals.length > 0) {
    topProfessionals.forEach(([nome, total]) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${nome} - ${total} atendimento(s)`;
      topProfessionalsList.appendChild(listItem);
    });
  } else {
    topProfessionalsList.innerHTML = '<li>Nenhum atendimento encontrado para o filtro selecionado.</li>';
  }
}

function searchProfessionals() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const timeFilter = document.getElementById('timeFilter').value;
  const typeFilter = document.getElementById('typeFilter').value;

  const now = new Date();

  
  const filteredProfessionals = professionals.filter(prof => {
    const matchesQuery = prof.name.toLowerCase().includes(query) || prof.type.toLowerCase().includes(query);
    const matchesType = typeFilter === 'todos' || prof.type === typeFilter;
    return matchesQuery && matchesType;
  });

  
  const filteredAtendimentos = carregarAtendimentos().filter(atendimento => {
    const atendimentoDate = new Date(atendimento.data);
    switch (timeFilter) {
      case 'dia':
        return atendimentoDate.toDateString() === now.toDateString();
      case 'semana':
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        return atendimentoDate >= startOfWeek;
      case 'mes':
        return atendimentoDate.getMonth() === now.getMonth() && atendimentoDate.getFullYear() === now.getFullYear();
      case 'ano':
        return atendimentoDate.getFullYear() === now.getFullYear();
      default:
        return false;
    }
  });

  
  const contagem = {};
  filteredAtendimentos.forEach(atendimento => {
    const nome = atendimento.nomeProfissional;
    if (!contagem[nome]) contagem[nome] = 0;
    contagem[nome]++;
  });

  
  professionalList.innerHTML = '';
  filteredProfessionals.forEach(prof => {
    const totalAtendimentos = contagem[prof.name] || 0;
    const card = document.createElement('div');
    card.className = 'professional-card';
    card.innerHTML = `
      <h3>${prof.name}</h3>
      <p>Total de atendimentos: ${totalAtendimentos}</p>
      <button onclick="startChat(${prof.id}, '${prof.name}')">Ir para o Chat</button>
    `;
    professionalList.appendChild(card);
  });
}


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const atendimento = {
    nomeProfissional: document.getElementById('nomeProfissional').value.trim(),
    tipoProfissional: document.getElementById('tipoProfissional').value,
    feedback: document.getElementById('feedback').value.trim()
  };

  salvarAtendimento(atendimento);
  form.reset();

  atualizarRelatorio();
});

document.getElementById('limparDados').addEventListener('click', () => {
  if (confirm('Tem certeza que deseja apagar todos os atendimentos?')) {
    localStorage.removeItem('atendimentos');
    atualizarRelatorio();
    alert('Todos os dados foram apagados.');
  }
});

atualizarRelatorio();