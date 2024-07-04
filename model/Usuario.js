const conexao = require('../config/conexao') 

let UsuarioSchema = new conexao.Schema({
    nome: String,
    email: String,
    senha: String,
    criacao: { type: Date, default: Date.now },
    foto: String,
    cpf: String,
    endereco: String,
    cidade: String,
    cep: String,
    celular: String,
    admin: Boolean
})

module.exports = conexao.model("Usuario", UsuarioSchema)