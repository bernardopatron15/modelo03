const conexao = require('../config/conexao');
const Schema = conexao.Schema;

let ProdutoSchema = new Schema({
    titulo: String,
    descricao: String,
    preco: Number,
    precoantigo: Number,
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' },
    foto: String
});

ProdutoSchema.methods.getDescontoPercentual = function() {
    if (this.precoantigo && this.precoantigo > this.preco) {
        return Math.round(((this.precoantigo - this.preco) / this.precoantigo) * 100);
    }
    return 0;
};

module.exports = conexao.model("Produto", ProdutoSchema);
