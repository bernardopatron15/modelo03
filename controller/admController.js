const Usuario = require("../model/Usuario");

function abreadd(req, res) {
  res.render("adm/add");
}

function add(req, res) {
  let usuario = new Usuario({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    admin: true // Definindo como administrador
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
  Usuario.find({ admin: true }).then(function (usuarios, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("adm/lst", { Adms: usuarios }); // Passando 'Usuarios' em vez de 'Adms'
    }
  });
}

function filtrar(req, res) {
  Usuario.find({
    nome: new RegExp(req.body.pesquisar.split(" ").join(".*"), "ig"),
    admin: true
  }).then(function (usuarios, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("adm/lst", { Usuarios: usuarios }); // Passando 'Usuarios' em vez de 'Adms'
    }
  });
}

function del(req, res) {
  Usuario.findByIdAndDelete(req.params.id).then(function (usuario, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/adm/lst");
    }
  });
}

function abreedt(req, res) {
  Usuario.findById(req.params.id).then(function (usuario, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("adm/edt", { Usuario: usuario });
    }
  });
}

function edt(req, res) {
  Usuario.findById(req.params.id).then(function (usuario, err) {
    if (err) {
      res.send(err);
    } else {
      usuario.nome = req.body.nome;
      usuario.email = req.body.email;
      usuario.senha = req.body.senha;
      usuario.save().then(function (usuario, err) {
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
