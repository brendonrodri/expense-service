function reduceExpensesValues(expensesList){
  return expensesList?.reduce((accumulator, expense) => {
    return expense.cost !== null ? accumulator + expense.cost : accumulator;
  }, 0);
}

module.exports = {
  reduceExpensesValues
}