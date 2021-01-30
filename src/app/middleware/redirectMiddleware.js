module.exports = (req, res, next) => {
  if(!req.session.logged) {
    next();
  }
  return res.redirect("/");
}