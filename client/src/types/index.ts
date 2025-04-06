export type TransactionType = "income" | "expense";

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  content: string;
  type: TransactionType;
  category_id: number;
  category_name: string;
}

export interface Category {
  id: number;
  type: string;
  name: string;
}

export interface Balance {
  income: number;
  expense: number;
  balance: number;
}
export interface CalenderEvent {
  start: string
  income: number;
  expense: number;
  balance: number;
}
