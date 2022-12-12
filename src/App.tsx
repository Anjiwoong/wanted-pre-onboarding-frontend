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
        {/* <Route
          path="/"
          element={
            isLoggedIn() ? <Navigate to="/todo" replace /> : <AuthPage />
          }
        />
        <Route
          path="/todo"
          element={
            localStorage.getItem('token') ? (
              <TodoPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        /> */}
        <Route path="/" element={<AuthPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </>
  );
};

export default App;
