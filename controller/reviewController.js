const Review = require('../model/Review');
const Produto = require('../model/Produto');

async function addReview(req, res) {
    try {
        const review = new Review({
            produto: req.params.id,
            rating: req.body.rating,
            comentario: req.body.comentario,
            nome: req.body.nome
        });

        await review.save();

        // Atualizar a média de avaliação do produto
        const reviews = await Review.find({ produto: req.params.id });
        const totalReviews = reviews.length;
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const mediaAvaliacao = totalRating / totalReviews;

        await Produto.findByIdAndUpdate(req.params.id, { mediaAvaliacao });

        res.redirect(`/produto/${req.params.id}`);
    } catch (err) {
        res.send(err);
    }
}

async function listarReviews(req, res) {
    try {
        const reviews = await Review.find({ produto: req.params.id }).populate('usuario');
        res.json(reviews);
    } catch (err) {
        res.send(err);
    }
}

async function removerAvaliacao(req, res) {
    try {
        const avaliacaoId = req.params.avaliacaoId;
        const produtoId = req.params.id;

        // Remover a avaliação pelo ID
        await Review.findByIdAndDelete(avaliacaoId);

        // Recalcular a média de avaliação do produto após remover a avaliação
        const reviews = await Review.find({ produto: produtoId });
        const totalReviews = reviews.length;
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const mediaAvaliacao = totalReviews > 0 ? totalRating / totalReviews : 0;

        // Atualizar a média de avaliação no documento do Produto
        await Produto.findByIdAndUpdate(produtoId, { mediaAvaliacao });

        // Redirecionar de volta para a página do produto
        res.redirect(`/produto/${produtoId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao remover a avaliação.');
    }
}   

module.exports = {
    addReview,
    listarReviews,
    removerAvaliacao
};
