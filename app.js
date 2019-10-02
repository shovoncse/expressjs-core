const express = require('express');
const path = require('path');
const app = express();
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 5000;
const Members = require('./members')

// Init Middleware
// app.use(logger);

// Handlebars Middlewares
// app.engine();
// app.set();

app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Member App',
    Members
  });
});

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));



app.listen(PORT, () => console.log(`Server Started at ${PORT}`));


