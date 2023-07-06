
const connection = require('../util/database').pool;
const db = require('../util/database');

// Get all expenses
exports.getExpenses = (req, res) => {
  db.execute('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error retrieving expenses from the database: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
};

// Create a new expense
exports.createExpense = (req, res) => {
  const { price, name, category } = req.body;

  if (!price || !name) {
    res.status(400).json({ error: 'Amount and description are required' });
    return;
  }

  const expense = {price, name, category };
  db.query('INSERT INTO products SET ?', expense, (err, result) => {
    if (err) {
      console.error('Error creating the expense: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(201).json({ message: 'Expense created successfully' });
  });
};

// Delete an expense
exports.deleteExpense = (req, res) => {
  const expenseId = req.params.id;
  db.query('DELETE FROM products WHERE id = ?', expenseId, (err, result) => {
    if (err) {
      console.error('Error deleting the expense: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Expense not found' });
      return;
    }
    res.json({ message: 'Expense deleted successfully' });
  });
};




