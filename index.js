//imports

//express vai ser a base da nossa aplicação, biblioteca que usamos para criar os servidores
const express = require('express');

//file system lib: serve para manipular arquivos no sistema
const fs = require('fs');

//biblioteca que auxilia na leitura de arquivos .env (variáveis de ambiente)
const dotenv = require('dotenv').config();

//faz o tratamento para que não tenhamos o erro de CORS.
const cors = require('cors');

//cria uma instãncia do express (anteriormente só importamos)
const app = express();
//busca a variável de ambiente para a porta do servidor no arquivo .env
const PORT = process.env.PORT;

//permite usar json no serviço/api
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4200/', //Define a origem como a mesma da aplicação.
  methods: ['GET', 'POST'], // Métodos permitidos
  allowedHeaders: ['Content-Type']
}));

app.get('/get-expense', (req, res)=>{
  //declarar o caminho do arquivo
  //declarar o charset
  //definir um callback com os params de error e o dados recebidos.
  fs.readFile('./expenses.json', 'utf8', (err, expenseData)=>{
    readerFileError(err, res);
    //se os dados estiverem disponíveis, coverte para json.
    try{
      //converte os dados para json
      const expenseJson = JSON.parse(expenseData);
      //devolve o json como resposta da api.
      res.json(expenseJson);
    }catch(err){
      console.log(err);
    }
  })

})

app.post('/save-expense', (req, res) => {
  fs.readFile('./expenses.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return res.status(500).json({ error: 'Erro ao salvar a despesa' });
    }

    let expenses = [];

    if (data) {
      try {
        expenses = JSON.parse(data);
        if (!Array.isArray(expenses)) {
          expenses = [];
        }
      } catch (parseError) {
        console.error('Erro ao converter JSON:', parseError);
        return res.status(500).json({ error: 'Erro ao processar os dados' });
      }
    }

    // Garantindo que req.body é sempre um array
    const newExpenses = Array.isArray(req.body) ? req.body : [req.body];

    // Filtrar apenas os itens que não existem na lista
    const filteredExpenses = newExpenses.filter(newExpense => 
      !expenses.some(expense => 
        expense.description === newExpense.description &&
        expense.cost === newExpense.cost &&
        expense.dueDate === newExpense.dueDate &&
        expense.expenseType === newExpense.expenseType
      )
    );

    // Se não houver novos itens, retorna sem alterar o JSON
    if (filteredExpenses.length === 0) {
      return res.json({ message: 'Nenhuma nova despesa adicionada (dados duplicados).' });
    }

    // Adiciona somente os itens únicos
    expenses.push(...filteredExpenses);

    fs.writeFile('./expenses.json', JSON.stringify(expenses, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Erro ao escrever no arquivo:', err);
        return res.status(500).json({ error: 'Erro ao salvar a despesa' });
      }
      res.json({ message: 'Despesas salvas com sucesso!', added: filteredExpenses.length });
    });
  });
});





// app.post('/save-expense', (req, res)=>{
//   const requestParsed = JSON.stringify(req.body);
//   fs.writeFile('./expenses.json', requestParsed, 'utf8',(err) => err && console.error(err));
// })

app.listen(3001, ()=>{
  console.log('rodando')
})


function readerFileError(err, res){
  //tratamento do erro. retorna status 500 caso exista um erro e define sua mensagem.
  if(err){
    console.log('Erro ao ler o arquivo json:', err);
    return res.status(500).json({err: 'Erro a ler arquivo'});
  }
}