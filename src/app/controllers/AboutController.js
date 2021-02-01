class AboutController {

  index(req, res) {
    res.render('about',{
      isLogged: req.session.logged,
      username: req.session.username || '',
    });
  }

}

module.exports = new AboutController;