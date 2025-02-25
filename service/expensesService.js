const fs = require('fs');
const {errorMessage} = require('../utils/error');
const filePath = './data/expenses.json';


const getExpenses = (callback) =>{
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return callback(err, null);
    
    try {
      const expenses = JSON.parse(data || '[]');
      callback(null, expenses);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
}

const saveExpense = (newExpense, callback)=>{
  getExpenses((err, expenses) => {
    if (err) return callback(err);

    if (!expenses.some(e => JSON.stringify(e) === JSON.stringify(newExpense))) {
      expenses.push(newExpense);
    }

    fs.writeFile(filePath, JSON.stringify(expenses, null, 2), 'utf8', (writeErr) => {
      if (writeErr) return callback(writeErr);
      callback(null, { message: "Despesa salva com sucesso!", added: 1 });
    });
  });
}

module.exports ={
  getExpenses,
  saveExpense
}