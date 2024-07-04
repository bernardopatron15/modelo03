const Usuario = require("../model/Usuario");

function abreadd(req, res) {
  res.render("adm/add");
}

function add(req, res) {
  let usuario = new Usuario({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    admin: true
  });

  usuario.save().then(function (usuario, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/adm/add");
    }
  });
}

function listar(req, res) {
  Adm.find({}).then(function (adms, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("adm/lst", { Adms: adms });
    }
  });
}

function filtrar(req, res) {
  Adm.find({
    nome: new RegExp(req.body.pesquisar.split(" ").join(".*"), "ig"),
  }).then(function (adms, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("adm/lst", { Adms: adms });
    }
  });
}

function del(req, res) {
  Adm.findByIdAndDelete(req.params.id).then(function (adm, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/adm/lst");
    }
  });
}

function abreedt(req, res) {
  Adm.findById(req.params.id).then(function (adm, err) {
    if (err) {
      res.send(err);
    } else {const express = require("express");
      const routes = express.Router();
      const controller = require("../controller/usuarioController");
      const multer = require("multer");
      const upload = multer({ dest: "public/fotos" });
      const passport = require('../config/passport.js'); // Importe o passport
      
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
      
      res.render("adm/edt", { Adm: adm });
    }
  });
}

function edt(req, res) {
  Adm.findById(req.params.id).then(function (adm, err) {
    if (err) {
      res.send(err);
    } else {
      adm.nome = req.body.nome;
      adm.email = req.body.email;
      adm.senha = req.body.senha;
      adm.save().then(function (adm, err) {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/adm/lst");
        }
      });
    }
  });
}


module.exports = {
  edt,
  abreedt,
  del,
  filtrar,
  listar,
  add,
  abreadd,
};
