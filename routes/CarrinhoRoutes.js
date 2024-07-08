const express = require('express');
const { body } = require('express-validator');
const routes = express.Router();
const carrinhoController = require('../controller/carrinhoController');

routes.get('/carrinho', carrinhoController.viewCart); // Visualizar o carrinho

routes.post('/carrinho/add', 
    [
        body('produto_id').isMongoId().withMessage('ID do produto inválido'),
        body('quantidade').isInt({ min: 1 }).withMessage('Quantidade deve ser no mínimo 1')
    ],
    carrinhoController.addToCart
); // Adicionar item ao carrinho

routes.post('/carrinho/update', 
    [
        body('produto_id').isMongoId().withMessage('ID do produto inválido'),
        body('quantidade').isInt({ min: 1 }).withMessage('Quantidade deve ser no mínimo 1')
    ],
    carrinhoController.updateCart
); // Atualizar quantidade de item no carrinho

routes.post('/carrinho/remove', 
    [
        body('produto_id').isMongoId().withMessage('ID do produto inválido')
    ],
    carrinhoController.removeFromCart
); // Remover item do carrinho

routes.get('/checkout', carrinhoController.abreCheckout); // Abrir página de checkout

module.exports = routes;
