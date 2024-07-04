const passport = require('passport');
const LocalStrategy = require('passport-local');
const Usuario = require('../model/Usuario.js');

passport.use(new LocalStrategy({
    passReqToCallback: true, 
    usernameField: 'email',
    passwordField: 'senha',
}, async function verify(req, username, password, cb) {
    let usuario = await Usuario.findOne({
        'email': username
    })    
    
    if (!usuario) {        
        return cb(null, false, req.flash('error', 'Email não encontrado.'));
    } else if (usuario.senha != password) {
        return cb(null, false, req.flash('error', 'Senha incorreta.'));
    } else {
        return cb(null, usuario);
    }
}));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, {
            id: user.id,
            nome: user.nome,
            email: user.email,
            foto: user.foto,
            cpf: user.cpf,
            endereco: user.endereco,
            cidade: user.cidade,
            cep: user.cep,
            celular: user.celular,
            admin: user.admin
        });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

module.exports = passport;
