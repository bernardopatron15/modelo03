const express = require('express');
const routes = express.Router();
const controller = require('../controller/produtoController');
const multer = require('multer');
const upload = multer({ dest: 'public/fotos' });
const adm = require("../config/autenticacaoadm.js");

routes.get('/produto/add',adm, controller.abreadd);
routes.post('/produto/add', upload.single('foto'), controller.add);

routes.get('/produto/lst',adm, controller.listar);
routes.post('/produto/lst', controller.filtrar);

routes.get('/produto/edt/:id',adm, controller.abreedt);
routes.post('/produto/edt/:id', upload.single('foto'), controller.edt);

routes.get('/produto/del/:id', controller.del);

module.exports = routes;
