const conexao = require('../config/conexao');
const Schema = conexao.Schema;

const ReviewSchema = new Schema({
    produto: { type: Schema.Types.ObjectId, ref: 'Produto' },
    nome: String,
    rating: Number,
    comentario: String,
    data: { type: Date, default: Date.now }
});

module.exports = conexao.model("Review", ReviewSchema);
