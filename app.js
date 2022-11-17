const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout');
const { db, Page, User } = require('./models/index');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

db.authenticate().then(() => {
  console.log('connected to the database');
});

app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});
const PORT = 3000;
const init = async () => {
  // await db.sync({ force: true });
  await db.sync();
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
