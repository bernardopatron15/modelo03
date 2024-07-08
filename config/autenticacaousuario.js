function aut(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/"); // Redirecione para uma página de login ou erro
  }
  
  module.exports = aut;