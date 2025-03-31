import { Balance, Transaction } from "../types";

export function calculateTransactions(transactions: Transaction[]): Balance 
{
  return transactions.reduce((result, transaction) => {
    if(transaction.type === 'income') {
      result.income += transaction.amount;
    }else {
      result.expense += transaction.amount;
    }

    result.balance = result.income - result.expense;

    return result;
  },{income: 0, expense: 0, balance: 0})
}

export function calculateDailyTransactions(transactions: Transaction[]): Record<string, Balance> 
{
  return transactions.reduce<Record<string, Balance>>((result, transaction) => {
    const day = transaction.date;
    if(!result[day]) {
      result[day] = {income: 0, expense: 0, balance: 0};
    }

    if(transaction.type === 'income') {
      result[day].income += transaction.amount;
    }else {
      result[day].expense += transaction.amount;
    }

    result[day].balance = result[day].income - result[day].expense;

    return result;
  },{})
}

export function formatCurrency(amount: number)
{
  return amount.toLocaleString('ja-JP');
}