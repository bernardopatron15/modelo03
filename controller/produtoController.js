const Produto = require("../model/Produto");
const Categoria = require('../model/Categoria');


function abreadd(req, res) {
  Categoria.find({})
    .then(function(categorias) {
      res.render('produto/add', {
        Produto: {}, // Passa um objeto vazio como Produto
        Categorias: categorias,
        usuario: req.user // Passa o objeto de usuário para a página
      });
    })
    .catch(function(err) {
      res.send("err");
    }); 
}

function add(req, res) {
  let produto = new Produto({
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    categoria: req.body.categoria, // Aqui você deve associar pelo ID da categoria
    preco: parseInt(req.body.preco),
    precoantigo: parseInt(req.body.precoantigo),
    foto: req.file.filename,
  });

  produto.save()
    .then(function (produto) {
      res.redirect("/produto/lst");
    })
    .catch(function (err) {
      res.send(err);
    });
}

function listar(req, res) {
  Produto.find({}).populate('categoria')
    .then(function (produtos) {
      res.render('produto/lst', {
        Produtos: produtos,
        usuario: req.user // Passa o objeto de usuário para a página
      });
    })
    .catch(function (err) {
      res.send(err);
    });
}

function filtrar(req, res) {
  Produto.find({
    titulo: new RegExp(req.body.pesquisar.split(" ").join(".*"), "ig"),
  })
    .then(function (produtos) {
      res.render("produto/lst", {
        Produtos: produtos,
        usuario: req.user // Passa o objeto de usuário para a página
      });
    })
    .catch(function (err) {
      res.send(err);
    });
}

function del(req, res) {
  Produto.findByIdAndDelete(req.params.id)
    .then(function () {
      res.redirect("/produto/lst");
    })
    .catch(function (err) {
      res.send(err);
    });
}

function abreedt(req, res) {
  Produto.findById(req.params.id)
    .then(function (produto) {
      Categoria.find({})
        .then(function (categorias) {
          res.render("produto/edt", {
            Produto: produto,
            Categorias: categorias,
            usuario: req.user // Passa o objeto de usuário para a página
          });
        })
        .catch(function (err) {
          res.send(err);
        });
    })
    .catch(function (err) {
      res.send(err);
    });
}

function edt(req, res) {
  Produto.findById(req.params.id)
    .then(function (produto) {
      let tempo = req.body.tempo;
      let [hora, minuto] = tempo.split(":");
      let data = new Date();
      data.setHours(hora);
      data.setMinutes(minuto);

      produto.titulo = req.body.titulo;
      produto.descricao = req.body.descricao;
      produto.categoria = req.body.categoria; // Aqui você deve associar pelo ID da categoria
      produto.preco = req.body.preco;
      produto.precoantigo = req.body.precoantigo;
      produto.foto = req.body.foto;

      return produto.save();
    })
    .then(function () {
      res.redirect("/produto/lst");
    })
    .catch(function (err) {
      res.send(err);
    });
}

module.exports = {
  abreadd,
  add,
  listar,
  filtrar,
  abreedt,
  edt,
  del,
};
