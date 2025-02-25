const express = require('express');
const router = express.Router();
const {getExpenses, saveExpense } = require('../service/expensesService');
const {errorMessage} = require('../utils/error');

router.get('/get-expenses', (req, res) => {
  getExpenses((err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao recuperar despesas' });
    res.json(data);
  });
})

router.post('/save', (req, res) => {
  saveExpense(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao salvar despesa' });
    res.json(result);
  });
})

module.exports = router;  
