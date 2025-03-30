import { Balance, Transaction } from "../types";

export function calculateTransactions(transactions: Transaction[]): Balance {
  return transactions.reduce((result, transaction) => {
    if(transaction.type === 'income') result.income += transaction.amount;
    if(transaction.type === 'expense') result.expense += transaction.amount;

    result.balance = result.income - result.expense;

    return result;
  },{income: 0, expense: 0, balance: 0})
}