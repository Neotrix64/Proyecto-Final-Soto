const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session')
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login')

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
  extname: '.hbs',
}));
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(myconnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: '3306',
  database: 'nodelogin'
}));

app.use(session({
  secret: 'secret',
  resave: 'true',
  saveUninitialized: 'true'
}));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.use('/', loginRoutes);

app.get('/', (req, res) =>{
  if(req.session.loggedin == true){
    res.render('home', {name: req.session.name})
  } else{
    res.redirect('/login')
}

})

//CRUD login