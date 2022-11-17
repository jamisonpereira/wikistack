
const { db, Page, User } = require('../models');
const express = require('express');
const router = express.Router();
const { addPage } = require('../views')

router.get('/', (req, res, next) => {
    res.send('got to GET /wiki/');
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
        });
        res.redirect('/');
    }
    catch (err) {
        next(err)
    }

  });
  
  router.get('/add', (req, res, next) => {
    res.send(addPage());
  });

module.exports = router;