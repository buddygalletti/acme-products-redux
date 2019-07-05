const Sequelize = require('sequelize');

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/acme_inventory'
);

const Product = db.define('product', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('INSTOCK', 'BACKORDERED', 'DISCONTINUED'),
    defaultValue: 'INSTOCK'
  }
});

// need to write a syncAndSeed()
sampleProducts = [
  {
    name: 'prod1',
    status: 'BACKORDERED'
  },
  {
    name: 'prod2'
  },
  {
    name: 'prod3',
    status: 'DISCONTINUED'
  },
  {
    name: 'prod4',
    status: 'BACKORDERED'
  },
  {
    name: 'prod5',
    status: 'BACKORDERED'
  },
  {
    name: 'prod6'
  },
  {
    name: 'prod7',
    status: 'DISCONTINUED'
  },
  {
    name: 'prod8'
  }
];

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(
      sampleProducts.map(product => {
        return Product.create(product);
      })
    );
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = {
  db,
  syncAndSeed,
  models: {
    Product
  }
};
