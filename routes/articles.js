const express = require('express');
const router = express.Router();
const articles = require('../services/articles');

router.get('/', async function(req, res, next) {
    try {
      res.json(await articles.getMultiple(req.query.page));
    } catch (err) {
      console.error(`Error while getting articles `, err.message);
      next(err);
    }
  });

router.post('/', async function(req, res, next) {
try {
    res.json(await articles.create(req.body));
} catch (err) {
    console.error(`Error while creating article`, err.message);
    next(err);
}
});
  
router.put('/:id', async function(req, res, next) {
try {
    res.json(await articles.update(req.params.id, req.body));
} catch (err) {
    console.error(`Error while updating article`, err.message);
    next(err);
}
});

router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await articles.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting article`, err.message);
      next(err);
    }
  });
  module.exports = router;