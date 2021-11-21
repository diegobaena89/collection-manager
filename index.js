const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const authRoutes = require('./routes/authRoutes');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/registrar', (req, res) => {
  res.render('registrar');
});

app.get('/', authRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log('Conectado!');
});
