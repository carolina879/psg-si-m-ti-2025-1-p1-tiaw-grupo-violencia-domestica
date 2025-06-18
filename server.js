const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const dbPath = path.join(__dirname, "db.json");

app.post("/api/cadastros", (req, res) => {
  const novoCadastro = req.body;

  let cadastros = [];
  if (fs.existsSync(dbPath)) {
    const dados = fs.readFileSync(dbPath, "utf8");
    cadastros = dados ? JSON.parse(dados) : [];
  }

  cadastros.push(novoCadastro);

  fs.writeFileSync(dbPath, JSON.stringify(cadastros, null, 2), "utf8");
  res.status(201).json({ message: "Cadastro salvo!" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
