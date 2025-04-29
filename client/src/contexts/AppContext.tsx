import { createContext, ReactNode, useContext, useState } from "react";
import { Budget, Transaction } from "../types";
import { backendAxios } from "../lib/backendAxios";
import { TransactionFormSchemaType } from "../validations";
import { format } from "date-fns";

interface AppContextType {
  monthlyTransactions: Transaction[];
  setMonthlyTransactions: (transactions: Transaction[]) => void;
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  budget: Budget | undefined;
  setBudget: React.Dispatch<React.SetStateAction<Budget | undefined>>;
  storeTransactions: (transaction: TransactionFormSchemaType) => Promise<void>;
  updateTransactions: (transaction: TransactionFormSchemaType, id: number) => Promise<void>;
  deleteTransactions: (transactionId: number) => Promise<void>;
  storeUpdateBudget: (budgetAmount: number, id?: number | null) => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [monthlyTransactions, setMonthlyTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [budget, setBudget] = useState<Budget | undefined>(undefined);

  const storeTransactions = async (transaction: TransactionFormSchemaType) => {
      try {
        const res = await backendAxios.post('transaction', {transaction});
        setMonthlyTransactions((prevTransactions) => [...prevTransactions, res.data.data]);
      } catch(err) {
        console.error(err);
      }
    }
  
    const updateTransactions = async (transaction: TransactionFormSchemaType, transactionId: number) => {
      try {
        if(!transactionId) throw new Error('idが存在しません');
        const res = await backendAxios.put(`transaction/${transactionId}`, {transaction});
        const updatedTransactions = monthlyTransactions.map((monthlyTransaction): Transaction => {
          return monthlyTransaction.id === transactionId ? {...monthlyTransaction, ...res.data.data} : monthlyTransaction;
        })
  
        setMonthlyTransactions(updatedTransactions);
      } catch(err) {
        console.error(err);
      }
    }
  
    const deleteTransactions = async (transactionId: number) => {
      try {
        if(!transactionId) throw new Error('idが存在しません');
        await backendAxios.delete(`transaction/${transactionId}`);
        setMonthlyTransactions((prevTransactions) => prevTransactions.filter((prevTransaction) => prevTransaction.id !== transactionId));
      } catch(err) {
        console.error(err);
      }
    }

    const storeUpdateBudget = async (budgetAmount: number, id: number | null = null) => {
      try {
        const params = {
          id, 
          budgetAmount,
          currentMonth: format(currentMonth, 'yyyy-MM')
        }
        const res = await backendAxios.post('budget', params);
        const newBudget = res.data.data
        setBudget(newBudget);
      } catch(err) {
        console.error(err);
      }
    }

  const values = {
    monthlyTransactions,
    setMonthlyTransactions,
    currentMonth,
    setCurrentMonth,
    budget,
    setBudget,
    storeTransactions,
    updateTransactions,
    deleteTransactions,
    storeUpdateBudget
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
}
