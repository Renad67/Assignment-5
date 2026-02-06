const express = require("express");
const app = express.Router();
const connection = require('../DB');

//a. Add a supplier with the name 'FreshFoods' and contact number '01001234567'.
app.post('/',express.json(), (req, res) => {
    const { SupplierName, ContactNumber } = req.body;
    const query = 'INSERT INTO Suppliers (SupplierName, ContactNumber) VALUES (?, ?)';
    connection.query(query, [SupplierName, ContactNumber], (err, results) => {
      if (err) {
        console.error('Error adding supplier:', err);
        res.status(500).json({ error: 'Failed to add supplier' });
      } else {
        res.status(201).json({ message: 'Supplier added successfully', supplierId: results.insertId });
      }
    });
});

//11-Find suppliers with names starting with 'F'.
app.get('/F', (req, res) => {
  const query = 'SELECT * FROM Suppliers WHERE SupplierName LIKE "F%"';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving suppliers with names starting with "F":', err);
      res.status(500).json({ error: 'Failed to retrieve suppliers' });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = app;