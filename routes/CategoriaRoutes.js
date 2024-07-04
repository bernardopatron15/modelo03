const express = require("express");
const routes = express.Router();
const controller = require("../controller/categoriaController");
const multer = require("multer");
const upload = multer({ dest: "public/fotos" });
//criar rotas aqui

routes.get("/categoria/add", controller.abreadd);
routes.post("/categoria/add", upload.single("foto"), controller.add);

routes.get("/categoria/lst", controller.listar);
routes.post("/categoria/lst", controller.filtrar);

routes.get("/categoria/edt/:id", controller.abreedt);
routes.post("/categoria/edt/:id", upload.single("foto"), controller.edt);

routes.get("/categoria/del/:id", controller.del);

module.exports = routes;
