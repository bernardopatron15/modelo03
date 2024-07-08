const { validationResult } = require('express-validator');
const Produto = require('../model/Produto');



// Função para visualizar o carrinho
async function viewCart(req, res) {
    try {
        const carrinho = req.session.carrinho || { itens: [] };
        const produtos = await Produto.find({ _id: { $in: carrinho.itens.map(item => item.produto) } });
        const itensCarrinho = carrinho.itens.map(item => {
            const produto = produtos.find(produto => produto._id.toString() === item.produto);
            return {
                produto,
                quantidade: item.quantidade,
                preco: item.preco
            };
        });

        // Calcular total do carrinho
        const total = itensCarrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

        res.render('carrinho', { 
            itensCarrinho,
            total,
            usuario: req.user
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Função para adicionar item ao carrinho
async function addToCart(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let carrinho = req.session.carrinho || { itens: [] };
        
        const produtoId = req.body.produto_id;
        const quantidade = parseInt(req.body.quantidade, 10) || 1;

        const produto = await Produto.findById(produtoId);
        if (!produto) {
            return res.status(404).send('Produto não encontrado.');
        }

        const itemIndex = carrinho.itens.findIndex(item => item.produto.toString() === produtoId);
        if (itemIndex > -1) {
            carrinho.itens[itemIndex].quantidade += quantidade;
        } else {
            carrinho.itens.push({ produto: produtoId, quantidade, preco: produto.preco });
        }

        req.session.carrinho = carrinho;
        res.redirect('/carrinho');
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Função para atualizar a quantidade de um item no carrinho
async function updateCart(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let carrinho = req.session.carrinho || { itens: [] };

        const produtoId = req.body.produto_id;
        const quantidade = parseInt(req.body.quantidade, 10);

        const itemIndex = carrinho.itens.findIndex(item => item.produto.toString() === produtoId);
        if (itemIndex > -1) {
            if (quantidade > 0) {
                carrinho.itens[itemIndex].quantidade = quantidade;
            } else {
                carrinho.itens.splice(itemIndex, 1);
            }

            req.session.carrinho = carrinho;
            res.redirect('/carrinho');
        } else {
            res.status(404).send('Produto não encontrado no carrinho.');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Função para remover um item do carrinho
async function removeFromCart(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let carrinho = req.session.carrinho || { itens: [] };

        const produtoId = req.body.produto_id;

        const itemIndex = carrinho.itens.findIndex(item => item.produto.toString() === produtoId);
        if (itemIndex > -1) {
            carrinho.itens.splice(itemIndex, 1);
            req.session.carrinho = carrinho;
            res.redirect('/carrinho');
        } else {
            res.status(404).send('Produto não encontrado no carrinho.');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Função para abrir a página de checkout
async function abreCheckout(req, res) {
    try {
        const carrinho = req.session.carrinho || { itens: [] };
        const produtos = await Produto.find({ _id: { $in: carrinho.itens.map(item => item.produto) } });
        const itensCarrinho = carrinho.itens.map(item => {
            const produto = produtos.find(produto => produto._id.toString() === item.produto);
            return {
                produto,
                quantidade: item.quantidade,
                preco: item.preco
            };
        });

        // Calcular total do carrinho
        const total = itensCarrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

        res.render('checkout', {
            itensCarrinho,
            total,
            usuario: req.user
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    viewCart,
    addToCart,
    updateCart,
    removeFromCart,
    abreCheckout
};
