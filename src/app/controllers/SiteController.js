const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
var paginateHelper = require('express-handlebars-paginate');

const Post = require('../models/Post');
const { mongoosesToObject } = require('../../utils/mongoose');
const { query } = require('express');

hbs.handlebars.registerHelper('paginateHelper', paginateHelper.createPagination);


class SiteController {

  index(req, res, next) {
    let perPage = 10;
    let page = parseInt(req.params.page) || 1;
    Post.find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .sort({
        created_at: -1
      })
      .exec((err, posts) => {
        Post.countDocuments((err, count) => {
          const pages = Math.ceil(count / perPage);
          if (err) {
            return next();
          }
          res.render('home', {
            nextPage: ((page + 1) > pages) ? pages : (page + 1),
            prevPage: ((page - 1) > 0) ? (page - 1) : 1,
            isLogged: req.session.logged,
            username: req.session.username || '',
            posts: mongoosesToObject(posts),
            error: req.query?.error,
            message: req.query?.message
          });

        });
      });
  }
}

module.exports = new SiteController;