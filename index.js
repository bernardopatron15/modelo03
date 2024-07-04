const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');  // Adicionado o connect-flash

// Configuração da sessão
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());  // Usar o middleware flash

// Inicialização do Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware para analisar o corpo das requisições
app.use(express.urlencoded({ extended: true }));

// Configuração do mecanismo de visualização
app.set("view engine", "ejs");

// Definição do diretório de arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Importação das rotas
const admroutes = require("./routes/AdmRoutes");
const usuarioroutes = require("./routes/UsuarioRoutes");
const produtoroutes = require("./routes/ProdutoRoutes");
const pedidoRoutes = require("./routes/PedidoRoutes");
const categoriaRoutes = require("./routes/CategoriaRoutes");
const carrinhoRoutes = require("./routes/CarrinhoRoutes"); // Importar as rotas do carrinho

// Uso das rotas
app.use(carrinhoRoutes);
app.use(admroutes);

app.use(produtoroutes);
app.use(usuarioroutes);
app.use(pedidoRoutes);
app.use(categoriaRoutes);
 // Usar as rotas do carrinho

// Inicialização do servidor
app.listen(port, function () {
  console.log(`Servidor funcionando na porta ${port}!`);
});
