function reduceExpensesValues(expenseList){
  return expenseList?.reduce((accumulator, expense) => {
    return expense.cost !== null ? accumulator + expense.cost : accumulator;
  }, 0);
}

module.exports = reduceExpensesValues();