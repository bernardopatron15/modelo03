const Categoria = require('../model/Categoria')

function abreadd(req, res) {
   res.render("categoria/add");    
}

function add(req, res) {
    // Criando um novo objeto Date
    let categoria = new Categoria({
        titulo: req.body.titulo,
    })

    categoria.save().then(function (categoria, err) {
        if (err) {
            res.send(err);
        } else {
            res.redirect("/categoria/add")
        }
    })
}

function listar(req, res) {
   Categoria.find({})
     .then(function (categorias) {
       res.render("categoria/lst", {
         Categorias: categorias,
       });
     })
     .catch(function (err) {
       res.send(err);
     });
 }


function filtrar(req, res) {
    Categoria.find({
        titulo: new RegExp(req.body.pesquisar.split(' ').join('.*'), 'ig')
    }).then(function (categorias, err) {
        if (err) {
            res.send(err)
        } else {
            res.render('categoria/lst', {
                Categorias: categorias
            })
        }
    })
}

function del(req, res) {
   Categoria.findByIdAndDelete(req.params.id)
     .then(function () {
       res.redirect("/categoria/lst");
     })
     .catch(function (err) {
       res.send(err);
     });
 }

function abreedt(req, res) {
    Categoria.findById(req.params.id).then(function (categoria, err) {
        if (err) {
            res.send(err)
        } else {
            res.render('categoria/edt', {
                Categoria: categoria
            })
        }
    })
}

function edt(req, res) {
    Categoria.findById(req.params.id).then(function (categoria, err) {
        if (err) {
            res.send(err)
        } else {
            categoria.titulo = req.body.titulo,
            categoria.save().then(function (categoria, err) {
                if (err) {
                    res.send(err);
                } else {
                    res.redirect('/categoria/lst')
                }
            })
        }
    })
}

module.exports = {
    abreadd,
    add,
    listar,
    filtrar,
    abreedt,
    edt,
    del
}