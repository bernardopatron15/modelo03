function aut(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
    return next();
  }
  res.redirect("/"); // Redirecione para uma página de login ou erro
}

module.exports = aut;
