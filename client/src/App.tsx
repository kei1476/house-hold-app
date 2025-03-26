import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Report from './pages/Report';
import AppLayout from './components/layout/AppLayout';
import axios from 'axios';
// import { theme } from './theme/theme';
// import { ThemeProvider } from '@emotion/react';
// import { AppContextProvider } from './context/AppContext';

function App() {
  const test = axios.get('http://localhost:8000/api/test');
  test.then(function (response) {
    console.log(response.data);

  });
  return (
    <>
      {/* <AppContextProvider > */}
        {/* <ThemeProvider theme={theme}> */}
            <CssBaseline />
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<AppLayout />}>
                  <Route index element={ <Home /> } />
                  <Route path='/report' element={ <Report />} />
                  <Route path='/*' element={ <NoMatch /> } />
                </Route>
              </Routes>
            </BrowserRouter>
        {/* </ThemeProvider> */}
      {/* </AppContextProvider> */}
    </>
  );
}

export default App;
