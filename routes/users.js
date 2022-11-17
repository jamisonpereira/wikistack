const { db, Page, User } = require('../models');
const express = require('express');
const router = express.Router();
const { userList, userPages } = require('../views/');

router.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(userList(allUsers));
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const pages = await Page.findAll({
      where: {
        authorId: req.params.id,
      },
    });
    res.send(userPages(user, pages));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
