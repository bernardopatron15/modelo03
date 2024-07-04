const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarrinhoSchema = new Schema({
    usuarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    itens: [{
        produto: { type: Schema.Types.ObjectId, ref: 'Produto', required: true },
        quantidade: { type: Number, required: true, default: 1 },
        preco: { type: Number, required: true }
    }],
    criadoEm: { type: Date, default: Date.now },
    atualizadoEm: { type: Date, default: Date.now }
});

// Middleware para atualizar a data de atualização
CarrinhoSchema.pre('save', function(next) {
    this.atualizadoEm = Date.now();
    next();
});

module.exports = mongoose.model('Carrinho', CarrinhoSchema);
