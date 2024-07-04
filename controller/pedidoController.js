const Pedido = require('../model/Pedido');

function add(req, res) {
    let pedido = new Pedido({
        nome: req.body.nome,
        cpf: req.body.cpf,
        email: req.body.email,
        endereco: req.body.endereco,
        cidade: req.body.cidade,
        cep: req.body.cep,
        celular: req.body.celular,
        produto: req.body.produto_id, // Inclua o ID do produto
    });

    pedido.save()
        .then(function (pedido) {
            res.redirect("/obrigado");  // Redirecionar após salvar o pedido
        })
        .catch(function (err) {
            res.send(err);  // Exibir erro caso ocorra
        });
}

function listar(req, res) {
    Pedido.find({})
        .populate('produto') // Populando o campo 'produto' para acessar os dados do produto associado
        .then(function (pedidos, err) {
            if (err) {
                res.send(err);
            } else {
                res.render('pedido/lst', {
                    Pedidos: pedidos
                });
            }
        });
}

function filtrar(req, res) {
    Pedido.find({
        produto: req.body.produto_id // Ajuste para buscar pelo ID do produto corretamente
    })
        .populate('produto') // Populando o campo 'produto' para acessar os dados do produto associado
        .then(function (pedidos, err) {
            if (err) {
                res.send(err);
            } else {
                res.render('pedido/lst', {
                    Pedidos: pedidos
                });
            }
        });
}

function del(req, res) {
    Pedido.findByIdAndDelete(req.params.id).then(function (pedido, err) {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/pedido/lst')
        }
    });
}

module.exports = {
    add,
    listar,
    filtrar,
    del
};
