import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyles from './styles/global';
import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <ToastContainer />
    <GlobalStyles />
  </>
);

export default App;
