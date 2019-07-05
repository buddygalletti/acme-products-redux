const express = require('express');
const app = express();
const path = require('path');
const db = require('./database');
const { Product } = db.models;

const port = process.env.PORT || 3000;

db.syncAndSeed();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/products', async (req, res, next) => {
  try {
    res.send(await Product.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post('/api/products', async (req, res, next) => {
  try {
    const [product, wasCreated] = await Product.findOrCreate({
      where: { name: req.body.name }
    });
    if (wasCreated) {
      res.send(product);
    }
  } catch (ex) {
    next(ex);
  }
});

app.delete('/api/products/:id', async (req, res, next) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.listen(port, () => console.log(`listening on port ${port}`));
