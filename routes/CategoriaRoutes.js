const express = require("express");
const routes = express.Router();
const controller = require("../controller/categoriaController");
const multer = require("multer");
const upload = multer({ dest: "public/fotos" });
const adm = require("../config/autenticacaoadm.js");

//criar rotas aqui

routes.get("/categoria/add",adm, controller.abreadd);
routes.post("/categoria/add", upload.single("foto"), controller.add);

routes.get("/categoria/lst",adm, controller.listar);
routes.post("/categoria/lst", controller.filtrar);

routes.get("/categoria/edt/:id",adm, controller.abreedt);
routes.post("/categoria/edt/:id", upload.single("foto"), controller.edt);

routes.get("/categoria/del/:id",adm, controller.del);

module.exports = routes;
