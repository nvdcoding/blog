const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const exphbs  = require('express-handlebars');

const cookieSession = require('cookie-session');
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser');


const db = require('./config/db');
const route  = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('src/resources/public'));

app.use(fileUpload());
app.use(cookieSession({
  secret: 'secret',
  resave: true, 
  saveUninitialized: true, 
}));
//connect
db.connect();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.get('/', (req, res) => {
  res.redirect('/1');
});

route(app);

app.listen(port, () => {
  console.log(port);
});