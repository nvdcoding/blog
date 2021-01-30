const bcrypt = require('bcrypt');
const User = require('../models/User');

class LoginController {

  login(req, res) {
    const { username, password } = req.body;
    User.findOne({ username: username, password: password }, (err, user) => {
      if(user) {
        req.session.logged = true;
        req.session.username = username;
        res.redirect('/posts/manage/1?message=Đăng nhập thành công');
      } else {        
        res.redirect('/?error=Tài khoản hoặc mật khẩu không đúng');
      }
    });
  }
  
  logout(req, res) {
      req.session.destroy(() => {
      res.redirect('/');
    });
  }

}

module.exports = new LoginController;