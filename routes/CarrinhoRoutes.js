const express = require('express');
const { body } = require('express-validator');
const routes = express.Router();
const controller = require('../controller/carrinhoController');
const autenticacao = require("../config/autenticacaoadm.js"); // Middleware para verificar se o usuário está autenticado

routes.get('/carrinho', autenticacao, controller.viewCart); // Visualizar o carrinho

routes.post('/carrinho/add', 
    autenticacao,
    [
        body('produto_id').isMongoId().withMessage('ID do produto inválido'),
        body('quantidade').isInt({ min: 1 }).withMessage('Quantidade deve ser no mínimo 1')
    ],
    controller.addToCart
); // Adicionar item ao carrinho

routes.post('/carrinho/update', 
    autenticacao,
    [
        body('produto_id').isMongoId().withMessage('ID do produto inválido'),
        body('quantidade').isInt({ min: 1 }).withMessage('Quantidade deve ser no mínimo 1')
    ],
    controller.updateCart
); // Atualizar quantidade de item no carrinho

routes.post('/carrinho/remove', 
    autenticacao,
    [
        body('produto_id').isMongoId().withMessage('ID do produto inválido')
    ],
    controller.removeFromCart
); // Remover item do carrinho

module.exports = routes;
