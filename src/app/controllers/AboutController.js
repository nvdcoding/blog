class AboutController {

  index(req, res) {
    res.render('about',{
      isLogged: req.session.logged,
      username: req.session.username || '',  
      error: req.query?.error,
      message: req.query?.message
    });
  }

}

module.exports = new AboutController;