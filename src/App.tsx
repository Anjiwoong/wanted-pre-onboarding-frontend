import { Route, Routes } from 'react-router-dom';
import GlobalStyle from './style/global-style';

import TodoPage from './pages/Todo';
import AuthPage from './pages/Auth';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </>
  );
};

export default App;
