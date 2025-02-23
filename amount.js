const express = require("express");
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

app.get('/get-amount', (req, res)=>{
  //declarar o caminho do arquivo
  //declarar o charset
  //definir um callback com os params de error e o dados recebidos.
  fs.readFile('./amoount.json', 'utf8', (err, amountData)=>{
    readerFileError(err, res);
    //se os dados estiverem disponíveis, coverte para json.
    try{
      //converte os dados para json
      const amountJson = JSON.parse(amountData);
      //devolve o json como resposta da api.
      res.json(amountJson);
    }catch(err){
      console.log(err);
    }
  })

})

app.post('/save-amount', (req, res) => {
  if (!req.body || req.body.initialAmount === undefined) {
    return res.status(400).json({ error: "initialAmount é obrigatório" });
  }

  let reduceExpense = reduceExpensesValues(json);
  amount.initialAmount = req.body.initialAmount;
  amount.totalExpenses = reduceExpense
  amount.economies = amount.initialAmount - reduceExpense;
  res.json({ success: true, amount });
});



app.listen(4000, ()=>{
  console.log('rodando na porta:', 4000);
})

function reduceExpensesValues(expenseList){
  return expenseList?.reduce((accumulator, expense) => {
    return expense.cost !== null ? accumulator + expense.cost : accumulator;
  }, 0);
}

let amount = {
  initialAmount: 0,
  economies: 0,
  totalExpenses:  0
}

let json = [
  {
    "description": "1",
    "cost": 1,
    "dueDate": "10 de Fev",
    "expenseType": "gas"
  },
  {
    "description": "2",
    "cost": 2,
    "dueDate": "10 de Fev",  
    "expenseType": "internet"
  },
  {
    "description": "3",
    "cost": 3,
    "dueDate": "10 de Fev",
    "expenseType": "luz"
  },
  {
    "description": "4",
    "cost": 4,
    "dueDate": "10 de Fev",
      "expenseType": "outros"
  },
  {
    "description": "zsasas",
    "cost": 313,
    "dueDate": "10 de Fev",
    "expenseType": "internet"
  },
  {
    "description": "3131313134412",
    "cost": 2000,
    "dueDate": "10 de Fev",
    "expenseType": "internet"
  },
  {
    "description": "192",
    "cost": 192,
    "dueDate": "10 de Fev",
    "expenseType": "internet"
  },
  {
    "description": "12",
    "cost": 21,
    "dueDate": "10 de Fev",
    "expenseType": "internet"
  }
];