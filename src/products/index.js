const connection = require('../DB');
const express = require("express");
const app = express.Router();

//7- Update the price of 'Bread' to 25.00.
app.post('/',express.json(), (req, res) => {
    const { ProductName, Price, StockQuantity } = req.body;
    const query = 'INSERT INTO Products (ProductName, Price, StockQuantity) VALUES (?, ?, ?)';
    connection.query(query, [ProductName, Price, StockQuantity], (err, results) => {
      if (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ error: 'Failed to add product' });
      } else {
        res.status(201).json({ message: 'Product added successfully', productId: results.insertId });
      }
    });
});

//7- Update the price of 'Bread' to 25.00.
app.put('/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const { ProductName, Price } = req.body;
  const query = 'UPDATE Products SET ProductName = ?, Price = ? WHERE ProductID = ?';
  connection.query(query, [ProductName, Price, id], (err, results) => {
    if (err) {
      console.error('Error updating product:', err);
      res.status(500).json({ error: 'Failed to update product' });
    } else {
      res.status(200).json({ message: 'Product updated successfully' });
    }
  });
});

//8- Delete the product 'Eggs'
app.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Products WHERE ProductID = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Failed to delete product' });
      } else {
        res.status(200).json({ message: 'Product deleted successfully' });
      }
    });
});

//10-Get the product with the highest stock. (0.5 Grade)
app.get('/highest-stock', (req, res) => {
  const query = 'SELECT * FROM Products ORDER BY StockQuantity DESC LIMIT 1';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving product with highest stock:', err);
      res.status(500).json({ error: 'Failed to retrieve product with highest stock' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

module.exports = app;