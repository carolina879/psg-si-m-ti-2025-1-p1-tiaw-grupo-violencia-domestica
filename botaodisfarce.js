const data = {
  culinaria: {
    tit: "Panelando",
    navtit:"Receitas",
    introTitle: "Deliciosas receitas para o dia a dia",
    introText: "Descubra pratos, receitas, fáceis pra toda a família e amigos. Todas aprovadas e testadas por profissionais.",
    introImage: "imgs/culinaria/yaki.png",
    disfarceicon: "imgs/culinaria/garfo.png",
    cards: [
      {
        title: "Strogonoff",
        text: "Deliciosa receita de strogonoff de frango com arroz e batata palha.",
        image: "imgs/culinaria/strogonoff.webp"
      },
      {
        title: "Filé",
        text: "Filé mignon ao ponto com molho especial e legumes.",
        image: "imgs/culinaria/carne.png"
      },
      {
        title: "Macarrão",
        text: "Macarrão à bolonhesa com queijo parmesão ralado.",
        image: "imgs/culinaria/macarrao.png"
      }
    ]
  },
  noticias: {
    tit: "Agora é Fato!",
    navtit:"Notícias",
    introTitle: "Notícias de última hora",
    introText: "Acompanhe os principais acontecimentos do Brasil e do mundo em tempo real.",
    introImage: "imgs/noticias/brasil.jpeg",
    disfarceicon: "imgs/noticias/jornal.png",
    cards: [
      {
        title: "Economia",
        text: "Alta no preço do arroz movimenta mercados e preocupa consumidores.",
        image: "imgs/noticias/arroz.jpg"
      },
      {
        title: "Tecnologia",
        text: "Nova inteligência artificial promete revolucionar o setor bancário.",
        image: "imgs/noticias/ia.jpg"
      },
      {
        title: "Saúde",
        text: "Nova vacina mostra eficácia de 95% em testes clínicos.",
        image: "imgs/noticias/vacina.webp"
      }
    ]
  },
  viagens: {
    tit: "Vai na Mala",
    navtit:"Destinos",
    introTitle: "Destinos imperdíveis pelo mundo",
    introText: "Explore lugares incríveis, culturas fascinantes e experiências únicas.",
    introImage: "imgs/viajens/paisagem.webp",
    disfarceicon: "imgs/viajens/aviao.png",
    cards: [
      {
        title: "Paris",
        text: "A cidade do amor, da arte e da gastronomia.",
        image: "imgs/viajens/paris.jpg"
      },
      {
        title: "Tóquio",
        text: "Tradição e tecnologia se encontram na capital japonesa.",
        image: "imgs/viajens/tokio.jpg"
      },
      {
        title: "Rio de Janeiro",
        text: "Praias, montanhas e alegria em cada esquina.",
        image: "imgs/viajens/rio.jpg"
      }
    ]
  }
};

const urlParams = new URLSearchParams(window.location.search);
let modo = localStorage.getItem("modoSelecionado") || "culinaria";

function trocarConteudo() {
  const modos = Object.keys(data);
  const index = modos.indexOf(modo);
  modo = modos[(index + 1) % modos.length];
  atualizarTela();
}

function atualizarTela() {
  const info = data[modo];

  document.title = info.tit;
  document.getElementById("navtit").textContent = info.tit;
  document.getElementById("sitetit2").textContent = info.tit;
  document.getElementById("sectiontitle").textContent =
    modo === "culinaria" ? "Receitas em destaques" :
    modo === "noticias" ? "Notícias em destaque" :
    "Lugares em destaque";

  const icone = document.getElementById("disfarceicon");
  icone.src = info.disfarceicon;

  document.getElementById("intro").innerHTML = `
    <h2>${info.introTitle}</h2>
    <p>${info.introText}</p>
    <button class="btn">${modo === "culinaria" ? "Receitas do dia" : "Saiba mais"}</button>
  `;
  document.getElementById("introImage").innerHTML = `<img src="${info.introImage}" alt="Imagem">`;

  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";
  info.cards.forEach(card => {
    container.innerHTML += `
      <div class="card">
        <img src="${card.image}" alt="${card.title}" />
        <div class="card-body">
          <h4>${card.title}</h4>
          <p>${card.text}</p>
        </div>
        <button>Ver ${modo === "culinaria" ? "receita" : "mais"}</button>
      </div>
    `;
  });
}

atualizarTela();
localStorage.removeItem("modoSelecionado");
