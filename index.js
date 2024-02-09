// Configuração com Express
let express = require("express"); // Servidor WEB - Comunicação entre o FRONT e O BACK END
let expressHandlebars = require("express-handlebars");
let app = express();
let idusuario = 1;

// Configurando conexão com o MySQL
let mysql = require("mysql2"); // Se comunicar com o MySQL
let conection = mysql.connect({
  // Abrindo uma conexão com o MySQL
  user: "root",
  password: "0305",
  host: "localhost",
  database: "bancolivraria",
  port: 3307,
});

app.engine(
  "handlebars",
  expressHandlebars.engine({
    defaultlayout: "main",
  })
);

app.set("view engine", "handlebars");
/*
// View engine Handlebars
let expressHandlebars = require('express-handlebars')

app.engine('handlebars', expressHandlebars.engine({
    defaultlayout: 'main'
}))
app.set('view engine', 'handlebars');
*/

/*app.use((req, res, next) => {
    console.log(`Solicitação recebida em: ${new Date()}`);
    next();
});*/

app.use("/", express.static(__dirname + "/public"));

// Codificando as rotas solicitadas pelo Front-End
app.get("/", (req, res) => {
  // A rota raíz retorna a tela de menu
  conection.query(
    // Listando dados
    "select l.idlivros as codigo, l.titulo_livro as titulo, l.imagem as image, l.descricao as descricao, l.anopublicacao as ano, a.nome_autor as autor, g.nome_genero as genero from livros l, autores a, generos g, editora e where l.idautor = a.idautores and l.idgeneros = g.idgeneros and l.ideditora = e.ideditora",
    (err, result) => {
      res.render("livros", { result });
    }
  );
});

app.get("/login", (req, res) => {
  // A rota raíz retorna a tela de menu
  let email = req.query.email;
  let senha = req.query.senha;
  conection.query(
    // Listando dados
    "select * from usuarios where email=? and senha=?",
    [email, senha],
    (err, result) => {
      if (result.length > 0) {
        idusuario = result[0].idusuario;
        //res.render("livros", {result}, {layout: "interno"})
      } else {
        alert("Usuário e/ou senha inválido!");
      }
    }
  );
});

app.get("/favoritando", (req, res) => {
  let codigo = req.query.codigo;

  if (idusuario) {
    // Verificar se o livro já está nos favoritos do usuário
    conection.query(
      "SELECT * FROM favoritos WHERE idusuarios = ? AND idlivros = ?",
      [idusuario, codigo], (err, rows) => {
        if (rows.length > 0) { // O livro está nos favoritos
          res.status(400).send("Livro já está nos favoritos.");
        } else { // O livro não está nos favoritos
          conection.query(
            "INSERT INTO favoritos(idusuarios, idlivros) VALUES (?, ?)",
            [idusuario, codigo], () => {
                res.redirect("/?mensagem=Livro%20favoritado%20com%20sucesso!");
            }
          );
        }
      }
    );
  } else {
    res.status(400).send("Precisa logar para favoritar!");
  }
});

app.get("/favoritos", (req, res) => {
  conection.query(
    // Listando dados
    "select * from favoritos",
    (err, result) => {
      res.render("favoritos", { result });
    }
  );
});

app.get("/deletar", (req, res) => {
  var idfavoritos = req.query.idfavoritos;
  conection.query(
    "delete from favoritos where idfavoritos = ?",
    [idfavoritos],
    (err, result) => {
      if (err) {
        console.error("Erro ao excluir registro:", err);
        res.status(500).send("Erro ao excluir registro.");
      } else {
        // Envie uma resposta indicando que a exclusão foi bem-sucedida
        res.redirect("/favoritos");
      }
    }
  );
});

// Inicializar o SERVIDOR WEB express
app.listen(80, () => {
  console.log("Servidor iniciado...");
});
