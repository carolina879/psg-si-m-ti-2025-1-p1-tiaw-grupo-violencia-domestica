
const denuncias = [
    {
        id: 1,
        titulo: "Denúncia 1",
        descricao: "Descrição da denúncia 1",
        data: "2025-05-01",
        arquivos: false
    },
    {
        id: 2,
        titulo: "Denúncia 2",
        descricao: "Descrição da denúncia 2",
        data: "2025-05-03",
        arquivos: true
    },
    {
        id: 3,
        titulo: "Denúncia 3",
        descricao: "Descrição da denúncia 3",
        data: "2025-05-04",
        arquivos: false
    }
];

console.log("JavaScript carregado!");


function carregarDenuncias(filtro = "") {
    const lista = document.getElementById("denunciasList");
    lista.innerHTML = ""; 

    const denunciasFiltradas = denuncias.filter(denuncia =>
        denuncia.titulo.toLowerCase().includes(filtro.toLowerCase())
    );

    denunciasFiltradas.forEach(denuncia => {
        const item = document.createElement("a");
        item.href = "#";
        item.className = "list-group-item list-group-item-action";
        item.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h5>${denuncia.titulo}</h5>
                <small>${new Date(denuncia.data).toLocaleDateString()}</small>
            </div>
            <p>${denuncia.descricao}</p>
            <small>${denuncia.arquivos ? "Arquivos anexados" : "Sem arquivos anexados"}</small>
        `;
        lista.appendChild(item);
    });
}


document.getElementById("searchForm").addEventListener("submit", event => {
    event.preventDefault();
    const filtro = document.getElementById("searchInput").value;
    carregarDenuncias(filtro);
});


const atendimentoForm = document.getElementById("atendimentoForm");
const cardsContainer = document.getElementById("cardsContainer");


atendimentoForm.addEventListener("submit", function (event) {
    event.preventDefault(); 
   
    const nomeProfissional = document.getElementById("nomeProfissional").value;
    const tipoProfissional = document.getElementById("tipoProfissional").value;
    const feedback = document.getElementById("feedback").value;

  
    const atendimento = {
        nomeProfissional,
        tipoProfissional,
        feedback,
        data: new Date().toLocaleString() 
    };

    const card = document.createElement("div");
    card.className = "card col-md-4 m-2 p-3 bg-light";
    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">Nome: ${atendimento.nomeProfissional}</h5>
            <p class="card-text">Tipo: ${atendimento.tipoProfissional}</p>
            <p class="card-text">Feedback: ${atendimento.feedback || "Nenhum feedback fornecido"}</p>
            <p class="card-text"><small class="text-muted">Data: ${atendimento.data}</small></p>
        </div>
    `;
    cardsContainer.appendChild(card);

   
    atendimentoForm.reset();


    alert("Atendimento registrado com sucesso!");
});


carregarDenuncias();

<script src="app.js" defer></script>