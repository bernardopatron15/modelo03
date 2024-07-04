function aut(req, res, next) {
  if (req.isAuthenticated() && req.user) {
    return next();
  }
  res.redirect("/"); // Redirecione para uma página de login ou erro
}

module.exports = aut;
