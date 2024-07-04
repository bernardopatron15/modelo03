const conexao = require('../config/conexao');

let PedidoSchema = new conexao.Schema({
    nome: String,
    cpf: String,
    email: String,
    endereco: String,
    cidade: String,
    cep: String,
    celular: String,
    produto: { type: conexao.Schema.Types.ObjectId, ref: 'Produto' }, // Modificado para referenciar o modelo do Produto
});

module.exports = conexao.model("Pedido", PedidoSchema);
