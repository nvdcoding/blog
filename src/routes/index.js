const aboutRouter = require('./about');
const postRouter = require('./post');
const siteRouter = require('./site');
const authRouter = require('./auth');

function route(app) {

  app.use('/', siteRouter);

  app.use('/about', aboutRouter);

  app.use('/posts', postRouter);

  app.use('/auth', authRouter);

}

module.exports = route;
