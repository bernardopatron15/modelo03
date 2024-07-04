const conexao = require('../config/conexao') 

let CategoriaSchema = new conexao.Schema({
    titulo: String,
})

module.exports = conexao.model("Categoria", CategoriaSchema)