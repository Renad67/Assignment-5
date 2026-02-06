const connection = require('../DB');
const express = require("express");
const app = express.Router();

//c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.
app.post('/',express.json(), (req, res) => {
    const { ProductID, QuantitySold, SaleDate } = req.body;
    const query = 'INSERT INTO Sales (ProductID, QuantitySold, SaleDate) VALUES (?, ?, ?)';
    connection.query(query, [ProductID, QuantitySold, SaleDate], (err, results) => {
      if (err) {
        console.error('Error adding sale:', err);
        res.status(500).json({ error: 'Failed to add sale' });
      } else {
        res.status(201).json({ message: 'Sale added successfully', saleId: results.insertId });
      }
    });
});

//9- Retrieve the total quantity sold for each product.
app.get('/total-quantity', (req, res) => {
  const query = 'SELECT ProductID, SUM(QuantitySold) AS TotalQuantity FROM Sales GROUP BY ProductID';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving total quantity sold:', err);
      res.status(500).json({ error: 'Failed to retrieve total quantity sold' });
    } else {
      res.status(200).json(results);
    }
  });
});

//12-Show all products that have never been sold.
app.get('/unsold-products', (req, res) => {
  const query = 'SELECT * FROM Products WHERE ProductID NOT IN (SELECT DISTINCT ProductID FROM Sales)';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving unsold products:', err);
      res.status(500).json({ error: 'Failed to retrieve unsold products' });
    } else {
      res.status(200).json(results);
    }
  });
});

//13-Get all sales along with product name and sale date.
app.get('/sales-details', (req, res) => {
  const query = 'SELECT Sales.SaleID, Products.ProductName, Sales.QuantitySold, Sales.SaleDate FROM Sales JOIN Products ON Sales.ProductID = Products.ProductID';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving sales details:', err);
      res.status(500).json({ error: 'Failed to retrieve sales details' });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = app;