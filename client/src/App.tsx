import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Report from './pages/Analysis';
import NoMatch from './pages/NoMatch';
import { theme } from './theme/theme';
// import { AppContextProvider } from './context/AppContext';

function App() {
  return (
    // <AppContextProvider >
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<AppLayout />}>
                <Route index element={ 
                  <Home /> 
                } />
                <Route path='/report' element={ 
                  <Report />
                } />
                <Route path='/*' element={ <NoMatch /> } />
              </Route>
            </Routes>
          </BrowserRouter>
      </ThemeProvider>
    // </AppContextProvider>
  );
}

export default App;
