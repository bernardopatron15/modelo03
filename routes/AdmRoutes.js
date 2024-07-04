const express = require("express");
const routes = express.Router();
const controller = require("../controller/usuarioController");
const admcontroller = require("../controller/admController");
const multer = require("multer");
const upload = multer({ dest: "public/fotos" });
const passport = require("../config/passport.js"); // Importe o passport
const adm = require("../config/autenticacaoadm.js");

// Middleware para proteger rotas autenticadas
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/"); // Se não autenticado, redireciona para a página de login
}

// Rotas públicas
routes.post(
  "/loginadm",
  passport.authenticate("local", {
    successRedirect: "/pedido/lst",
    failureRedirect: "/loginadm",
    failureFlash: true, // Habilitar mensagens de falha com connect-flash
  })
);

//routes.get("/loginadm", admcontroller.abreloginadm);

// Rota para logout
routes.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/home"); // Redireciona para a página inicial após o logout
  });
});

// Rotas de usuário
routes.get("/adm/add",adm,admcontroller.abreadd);
routes.post("/adm/add", upload.single("foto"), admcontroller.add);

routes.get("/adm/lst",adm, admcontroller.listar);
routes.post("/adm/lst", controller.filtrar);

routes.get("/adm/edt/:id", controller.abreedt);
routes.post("/adm/edt/:id", upload.single("foto"), controller.edt);

routes.get("/adm/del/:id", controller.del);

module.exports = routes;
