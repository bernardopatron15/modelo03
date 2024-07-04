function aut(req, res, next) {
  if (req.isAuthenticated() && req.user) {
    return next();
  }
  res.redirect("/login"); // Redirecione para uma página de login ou erro
}

module.exports = aut;
