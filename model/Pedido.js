const conexao = require('../config/conexao');

let PedidoSchema = new conexao.Schema({
    usuario: { type: conexao.Schema.Types.ObjectId, ref: 'Usuario' },
    nome: String,
    cpf: String,
    email: String,
    endereco: String,
    cidade: String,
    cep: String,
    celular: String,
    produto: { type: conexao.Schema.Types.ObjectId, ref: 'Produto' },
    createdAt: { type: Date, default: Date.now } // Adicionando campo createdAt com valor padrão de data atual
});

module.exports = conexao.model("Pedido", PedidoSchema);
