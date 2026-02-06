const connection = require('./src/DB');
const Suppliers = require('./src/supplier');
const Sales = require('./src/sales');
const Products = require('./src/products');
const express = require('express');
const app = express();
const port = 3000;


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/suppliers', Suppliers);
app.use('/sales', Sales);
app.use('/products', Products);

module.exports = {
  connection,
  Suppliers,
  Sales,
  Products
};
