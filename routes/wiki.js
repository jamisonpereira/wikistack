const { db, Page, User } = require('../models');
const express = require('express');
const router = express.Router();
const { addPage } = require('../views');
const wikipage = require('../views/wikipage');
const main = require('../views/main');

router.get('/', async (req, res, next) => {
  try {
    const allPages = await Page.findAll();
    res.send(main(allPages));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const author = req.body.author;
  const title = req.body.title;
  const content = req.body.content;
  const email = req.body.email;
  const status = req.body.status;

  try {
    const page = await Page.create({
      title: title,
      content: content,
      status: status,
    });

    const [user, wasCreated] = await User.findOrCreate({
      where: { name: author },
      defaults: {
        name: author,
        email: email,
      },
    });

    await page.setAuthor(user);

    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(err);
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    const author = await page.getAuthor();
    console.log('AUTHOR: ', author);
    res.send(wikipage(page, author));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
