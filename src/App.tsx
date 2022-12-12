import { Navigate, Route, Routes } from 'react-router-dom';
import GlobalStyle from './style/global-style';

import TodoPage from './pages/Todo';
import AuthPage from './pages/Auth';

const App = () => {
  const isLoggedIn = () => localStorage.getItem('token');

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn() ? <Navigate to="/todo" replace /> : <AuthPage />
          }
        />
        <Route
          path="/todo"
          element={isLoggedIn() ? <TodoPage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
};

export default App;
