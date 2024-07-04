const express = require("express");
const routes = express.Router();
const controller = require("../controller/usuarioController");
const multer = require("multer");
const upload = multer({ dest: "public/fotos" });
const passport = require('../config/passport.js');

// Middleware para proteger rotas autenticadas
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/'); // Se não autenticado, redireciona para a página de login
}

// Rotas públicas
routes.post("/", passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true  // Habilitar mensagens de falha com connect-flash
}));

routes.get("/", controller.abrelogin);

routes.get("/home", controller.abrehome);

routes.get("/categoria", controller.abrecategoria);

routes.get("/checkout/:id", controller.abrecheckout);

routes.get("/produto/:id", controller.abreproduto);

routes.get('/obrigado', controller.agradecer);

// Rota para logout
routes.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/home'); // Redireciona para a página inicial após o logout
  });
});

// Rota para listar produtos por categoria
routes.get('/categoria/:categoriaId/produtos', controller.listarProdutosPorCategoria);

// Rotas de usuário
routes.get("/usuario/add", controller.abreadd);
routes.post("/usuario/add", upload.single("foto"), controller.add);

routes.get("/usuario/lst", controller.listar);
routes.post("/usuario/lst", controller.filtrar);

routes.get("/usuario/edt/:id", controller.abreedt);
routes.post("/usuario/edt/:id", upload.single("foto"), controller.edt);

routes.get("/usuario/del/:id", controller.del);

module.exports = routes;
