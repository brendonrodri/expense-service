const express = require('express');
const cors = require('cors');
require('dotenv').config();

const expensesRoutes = require('./routes/expensesRoutes');
const amountRoutes = require('./routes/amountRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Rotas
app.use('/expenses', expensesRoutes);
app.use('/amount', amountRoutes);

app.listen(3001, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
