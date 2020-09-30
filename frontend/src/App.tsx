import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyles from './styles/global';

import { AuthProvider } from './contexts/AuthContext';

import Routes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes />
    </AuthProvider>

    <ToastContainer />
    <GlobalStyles />
  </BrowserRouter>
);

export default App;
