const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const path = require('path');
const appController = require('./controllers/appControllers');


const db = require('./util/database');

db.query('SELECT 1 + 1', (err, result) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Middleware for parsing JSON data
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Expense routes
app.get('/products', appController.getExpenses);
app.post('/products', appController.createExpense);
app.delete('/products/:id', appController.deleteExpense);

// Start the server
const port = 3000; 
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
