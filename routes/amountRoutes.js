const express = require('express');
const router = express.Router();
const {getExpenses, saveExpense } = require('../service/expensesService');
const {errorMessage} = require('../utils/error');

router.get('/get-expenses', (request, response)=>{
  getExpenses((error, data)=>{
    errorMessage(error, response, 'Erro ao recuperar despesas');
    response.json(data);
  });
})

router.post('/save-expenses', (request, response)=>{
  saveExpense(request.body, (error)=>{
    errorMessage(error, response, 'Erro ao salvar despesa');
  })
  
})

module.exports = router;  
