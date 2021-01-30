const Post = require('../models/Post');
const path = require('path');
const fs = require('fs');
const { mongooseToObject, mongoosesToObject } = require('../../utils/mongoose');
class PostController {

  index(req, res) {
    res.render('post', {
      isLogged: req.session.logged,
      username: req.session.username || '',
    });
  }

  indexCreate(req, res) {
    res.render('create', {
      isLogged: req.session.logged,
      username: req.session.username || '',
      error: req.query?.error,
      message: req.query?.message
    });
  }

  indexUpdate(req, res) {
    Post.findById(req.params.id, (err, post) => {
      if(post) {
        res.render('update', {
          isLogged: req.session.logged,
          username: req.session.username || '',
          post: mongooseToObject(post)
        });
      }
    });
  }

  showPost(req, res) {
    Post.findById(req.params.id, (err, post) => {
      res.render('post', {
        isLogged: req.session?.logged,
        username: req.session?.username || '',
        post: mongooseToObject(post)
      });
    });
  }

  store(req, res) {
    const image = req.files.thumbnail;
    image.mv(path.resolve(process.cwd(), 'src', 'resources', 'public', 'img', 'post', image.name), (err) => {
      console.log(path.resolve(process.cwd(), 'src', 'resources', 'public', 'img', 'post', image.name));
      Post.create({
        ...req.body,
        thumbnail: '\\img\\post\\' + image.name,
      }, (err, post) => {
        res.redirect('/');
      });
    });
  }

  remove(req, res, next) {
    const str = path.resolve(process.cwd(), 'src', 'resources', 'public');
    Post.findByIdAndRemove(req.params.id, (err, post) => {
      if (err) {
        return next(err);
      }
      fs.unlinkSync(str + post.thumbnail);
      res.send('');
    });
  }

  edit(req, res, next) {
    const str = path.resolve(process.cwd(), 'src', 'resources', 'public');
    const image = req.files.thumbnail;
    image.mv(path.resolve(process.cwd(), 'src', 'resources', 'public', 'img', 'post', image.name), (err) => {
      Post.findByIdAndUpdate(req.params.id ,{
        ...req.body,
        thumbnail: '\\img\\post\\' + image.name,
      }, (err, post) => {
        fs.unlink(str + post.thumbnail, (err) => {
          console.log(err);
        });
        res.send('');
      });
    });
  }

  manager(req, res) {
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
          res.render('posts-manager', {
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

module.exports = new PostController;