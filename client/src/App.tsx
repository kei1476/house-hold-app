import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Report from './pages/Analysis';
import NoMatch from './pages/NoMatch';
import { theme } from './theme/theme';
import { useEffect, useState } from 'react';
import { Transaction } from './types';
import { backendAxios } from './lib/backendAxios';
import { format } from "date-fns";
import { TransactionFormSchemaType } from './validations';

function App() {
  const [monthlyTransactions, setMonthlyTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  useEffect(() => {
    const fetchMonthlyTransactions = async () => {
      try {
        const params = {
          currentMonth: format(currentMonth, 'yyyy-MM')
        }
        const res = await backendAxios.get('transaction/currentMonth/', {params});
        setMonthlyTransactions(res.data);
      } catch(err) {
        console.error(err);
      }
    }

    fetchMonthlyTransactions();
  },[currentMonth]);

  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<AppLayout />}>
                <Route index element={ <Home monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth} /> } />
                <Route path='/report' element={ <Report /> } />
                <Route path='/*' element={ <NoMatch /> } />
              </Route>
            </Routes>
          </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
