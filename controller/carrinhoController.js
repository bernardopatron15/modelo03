const { validationResult } = require('express-validator');
const Carrinho = require('../model/Carrinho');
const Produto = require('../model/Produto');

// Função para visualizar o carrinho
async function viewCart(req, res) {
    try {
        const carrinho = await Carrinho.findOne({ usuarioId: req.user._id }).populate('itens.produto');
        res.render('carrinho/lst', { Carrinho: carrinho });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// Função para adicionar item ao carrinho
async function addToCart(req, res) {
   console.log('Request Body:', req.body); // Verifique os dados recebidos

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       console.log(errors.array()); // Verifique os erros de validação
       return res.status(400).json({ errors: errors.array() });
   }

   try {
       // Verifique se req.user._id está definido
       if (!req.user || !req.user._id) {
           return res.status(401).send('Usuário não autenticado.');
       }

       let carrinho = await Carrinho.findOne({ usuarioId: req.user._id });
       if (!carrinho) {
           carrinho = new Carrinho({ usuarioId: req.user._id, itens: [] });
       }

       const produtoId = req.body.produto_id;
       console.log('Produto ID:', produtoId); // Verifique o ID do produto
       const quantidade = parseInt(req.body.quantidade, 10) || 1;

       const produto = await Produto.findById(produtoId);
       if (!produto) {
           return res.status(404).send('Produto não encontrado.');
       }

       const itemIndex = carrinho.itens.findIndex(item => item.produto.toString() === produtoId);
       if (itemIndex > -1) {
           carrinho.itens[itemIndex].quantidade += quantidade;
       } else {
           carrinho.itens.push({ produto: produtoId, quantidade: quantidade, preco: produto.preco });
       }

       await carrinho.save();
       res.redirect('/carrinho');
   } catch (err) {
       console.error(err); // Log de erro para depuração
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
        const carrinho = await Carrinho.findOne({ usuarioId: req.user._id });
        if (!carrinho) {
            return res.status(404).send('Carrinho não encontrado.');
        }

        const produtoId = req.body.produto_id;
        const quantidade = parseInt(req.body.quantidade, 10);

        const itemIndex = carrinho.itens.findIndex(item => item.produto.toString() === produtoId);
        if (itemIndex > -1) {
            if (quantidade > 0) {
                carrinho.itens[itemIndex].quantidade = quantidade;
            } else {
                carrinho.itens.splice(itemIndex, 1);
            }

            await carrinho.save();
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
        const carrinho = await Carrinho.findOne({ usuarioId: req.user._id });
        if (!carrinho) {
            return res.status(404).send('Carrinho não encontrado.');
        }

        const produtoId = req.body.produto_id;

        const itemIndex = carrinho.itens.findIndex(item => item.produto.toString() === produtoId);
        if (itemIndex > -1) {
            carrinho.itens.splice(itemIndex, 1);
            await carrinho.save();
            res.redirect('/carrinho');
        } else {
            res.status(404).send('Produto não encontrado no carrinho.');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    viewCart,
    addToCart,
    updateCart,
    removeFromCart
};
