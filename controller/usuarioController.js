const Usuario = require("../model/Usuario");
const Produto = require("../model/Produto");

async function listarProdutosPorCategoria(req, res) {
  try {
    const categoriaId = req.params.categoriaId;

    const produtos = await Produto.find({ categoria: categoriaId }).populate('categoria');

    // Adiciona o percentual de desconto a cada produto
    const produtosComDesconto = produtos.map(produto => {
      const desconto = produto.getDescontoPercentual();
      return { ...produto._doc, desconto };
    });

    res.render('categoria', {
      Produtos: produtosComDesconto,
      usuario: req.user // Supondo que o objeto de usuário esteja disponível em req.user
    });
  } catch (err) {
    res.send(err);
  }
}

function abreadd(req, res) {
  res.render("usuario/add");
}

function abrelogin(req, res) {
  const error = req.flash('error'); // Obter a mensagem de erro da flash
  res.render("login", { error: error.length > 0 ? error[0] : null });
}

function abrehome(req, res) {
  // IDs das categorias específicas
  const categoriaEletronicoId = "6601b67256536508dd6acc69";
  const categoriaSalaId = "66831500940f42d034cb50fc";
  const categoriaCozinhaId = "660c62f69c121a0aaaf1640e";

  // Promises para buscar produtos de cada categoria
  const eletronicoPromise = Produto.find({ categoria: categoriaEletronicoId }).populate('categoria');
  const salaPromise = Produto.find({ categoria: categoriaSalaId }).populate('categoria');
  const cozinhaPromise = Produto.find({ categoria: categoriaCozinhaId }).populate('categoria');

  // Executa todas as promises e processa os resultados
  Promise.all([eletronicoPromise, salaPromise, cozinhaPromise])
    .then(function ([eletronicoProdutos, salaProdutos, cozinhaProdutos]) {
      // Adiciona o percentual de desconto a cada produto
      const eletronicoComDesconto = eletronicoProdutos.map(produto => ({ ...produto._doc, desconto: produto.getDescontoPercentual() }));
      const salaComDesconto = salaProdutos.map(produto => ({ ...produto._doc, desconto: produto.getDescontoPercentual() }));
      const cozinhaComDesconto = cozinhaProdutos.map(produto => ({ ...produto._doc, desconto: produto.getDescontoPercentual() }));

      res.render('home', {
        eletronicoProdutos: eletronicoComDesconto,
        salaProdutos: salaComDesconto,
        cozinhaProdutos: cozinhaComDesconto,
        usuario: req.user // Supondo que o objeto de usuário esteja disponível em req.user
      });
    })
    .catch(function (err) {
      res.send(err);
    });
}



function renderHome(req, res) {
  res.render('home'); // Supondo que você queira renderizar a página 'home.ejs'
}

async function abrecategoria(req, res) {
  try {
    const categoria = req.params.categoria;

    const produtos = await Produto.find({ categoria: categoria });

    const produtosComDesconto = produtos.map(produto => {
      const desconto = produto.getDescontoPercentual();
      return { ...produto._doc, desconto };
    });

    res.render('categoria', {
      produtos: produtosComDesconto,
      usuario: req.user // Supondo que o objeto de usuário esteja disponível em req.user
    });
  } catch (err) {
    res.send(err);
  }admin: Boolean
}

async function agradecer(req, res) {
  try {
    const produtos = await Produto.find({}).populate('categoria');
    const produtosComDesconto = produtos.map(produto => {
      const desconto = produto.getDescontoPercentual();
      return { ...produto._doc, desconto };
    });

    res.render('obrigado', {
      Produtos: produtosComDesconto,
      usuario: req.user // Supondo que o objeto de usuário esteja disponível em req.user
    });
  } catch (err) {
    res.send(err);
  }
}

async function abrecheckout(req, res) {
  try {
    const produto = await Produto.findById(req.params.id).populate('categoria');
    const desconto = produto.getDescontoPercentual();
    const produtoComDesconto = { ...produto._doc, desconto };

    res.render('checkout', {
      produto: produtoComDesconto,
      usuario: req.user // Supondo que o objeto de usuário esteja disponível em req.user
    });
  } catch (err) {
    res.send(err);
  }
}

async function abreproduto(req, res) {
  try {
    const produto = await Produto.findById(req.params.id).populate('categoria');
    const desconto = produto.getDescontoPercentual();
    const produtoComDesconto = { ...produto._doc, desconto };

    res.render('produto', {
      produto: produtoComDesconto,
      usuario: req.user // Supondo que o objeto de usuário esteja disponível em req.user
    });
  } catch (err) {
    res.send(err);
  }
}

function add(req, res) {
  let usuario = new Usuario({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    foto: req.file.filename,
    cpf: req.body.cpf,
    endereco: req.body.endereco,
    cidade: req.body.cidade,
    cep: req.body.cep,
    celular: req.body.celular,admin: Boolean,
    admin: false
  });

  usuario.save().then(function (usuario, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/usuario/add");
    }
  });
}

function listar(req, res) {
  Usuario.find({}).then(function (usuarios, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("usuario/lst", { Usuarios: usuarios });
    }
  });
}

function filtrar(req, res) {
  Usuario.find({
    nome: new RegExp(req.body.pesquisar.split(" ").join(".*"), "ig"),
  }).then(function (usuarios, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("usuario/lst", { Usuarios: usuarios });
    }
  });
}

function del(req, res) {
  Usuario.findByIdAndDelete(req.params.id).then(function (usuario, err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/usuario/lst");
    }
  });
}
admin: Boolean
function abreedt(req, res) {
  Usuario.findById(req.params.id).then(function (usuario, err) {
    if (err) {
      res.send(err);
    } else {
      res.render("usuario/edt", { Usuario: usuario });
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
      usuario.senha = req.body.senha; // Correção aqui
      usuario.foto = req.body.foto;
      usuario.cpf = req.body.cpf;
      usuario.endereco = req.body.endereco;
      usuario.cidade = req.body.cidade;
      usuario.cep = req.body.cep;
      usuario.celular = req.body.celular;
      usuario.save().then(function (usuario, err) {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/usuario/lst");
        }
      });
    }
  });
}

function logout(req, res) {
  res.redirect('/home');
}

module.exports = {
  edt,
  abreedt,
  del,
  filtrar,
  listar,
  add,
  abreadd,
  abrelogin,
  abrehome,
  abrecategoria,
  abrecheckout,
  abreproduto,
  renderHome,
  logout,
  agradecer,
  listarProdutosPorCategoria,
};
