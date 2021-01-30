
module.exports = (req, res, next) => {
  if(!req.session.logged) {
    return res.redirect('/');
  }
  next();
}
