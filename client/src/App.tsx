import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import NoMatch from './pages/NoMatch';
import { theme } from './theme/theme';
import { useEffect, useState } from 'react';
import { Budget, Transaction } from './types';
import { backendAxios } from './lib/backendAxios';
import { format } from "date-fns";
import { TransactionFormSchemaType } from './validations';

function App() {
  const [monthlyTransactions, setMonthlyTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [budget, setBudget] = useState<Budget | undefined>(undefined);

  useEffect(() => {
    const fetchMonthlyTransactions = async () => {
      try {
        const params = {
          currentMonth: format(currentMonth, 'yyyy-MM')
        }
        const res = await backendAxios.get('transaction/currentMonth/', {params});
        setMonthlyTransactions(res.data.data);

        getMonthlyBudget();
      } catch(err) {
        console.error(err);
      }
    }

    fetchMonthlyTransactions();
  },[currentMonth]);

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

  const getMonthlyBudget = async () => {
    try {
      const params = {
        currentMonth: format(currentMonth, 'yyyy-MM')
      }
      const res = await backendAxios.get(`budget/currentMonth`, {params});

      setBudget(res.data.data);
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

  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<AppLayout />}>
                <Route index element={ 
                    <Home 
                      monthlyTransactions={monthlyTransactions} 
                      setCurrentMonth={setCurrentMonth} 
                      storeTransactions={storeTransactions}
                      updateTransactions={updateTransactions}
                      deleteTransactions={deleteTransactions}
                      budget={budget}
                      storeUpdateBudget={storeUpdateBudget}
                    /> 
                  } />
                <Route path='/analysis' element={
                  <Analysis 
                    currentMonth={currentMonth}
                    setCurrentMonth={setCurrentMonth} 
                    monthlyTransactions={monthlyTransactions}
                  /> 
                } />
                <Route path='/*' element={ <NoMatch /> } />
              </Route>
            </Routes>
          </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
