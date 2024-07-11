const express = require("express");
const routes = express.Router();
const controller = require("../controller/usuarioController");
const multer = require("multer");
const upload = multer({ dest: "public/fotos" });
const passport = require('../config/passport.js');
const reviewController = require('../controller/reviewController');

// Rotas para reviews
routes.post('/produto/:id/review', reviewController.addReview);
routes.get('/produto/:id/reviews', reviewController.listarReviews);
routes.post('/:id/remover-avaliacao/:avaliacaId', reviewController.removerAvaliacao);



routes.get('/busca', controller.buscaProduto);

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

routes.get('/categoria/:categoriaId/produtos', controller.listarProdutosPorCategoria);

routes.get("/checkout/:id", controller.abreCheckout);

routes.get("/produto/:id", controller.abreproduto);

routes.get("/obrigado", controller.agradecer);

routes.get("/frete", controller.frete);

routes.get("/privacidade", controller.privacidade);

routes.get("/sobrenos", controller.sobrenos);

routes.get("/termos", controller.termos);

routes.get("/ajuda", controller.ajuda);





// Rotas autenticadas
routes.get("/logout", ensureAuthenticated, controller.logout);

routes.get("/usuario/add", ensureAuthenticated, controller.abreadd);

routes.post("/usuario/add", ensureAuthenticated, upload.single("foto"), controller.add);

routes.get("/usuario/lst", ensureAuthenticated, controller.listar);

routes.post("/usuario/lst", ensureAuthenticated, controller.filtrar);

routes.get("/usuario/del/:id", ensureAuthenticated, controller.del);

routes.get("/usuario/edt/:id", ensureAuthenticated, controller.abreedt);

routes.post("/usuario/edt/:id", ensureAuthenticated, upload.single("foto"), controller.edt);

routes.get("/meus-pedidos", ensureAuthenticated, controller.listarPedidos);

module.exports = routes;
