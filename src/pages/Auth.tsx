import { useState } from 'react';
import styled from 'styled-components';
import AuthForm from '../components/auth/AuthForm';
import AuthTitle from '../components/auth/AuthTitle';

const AuthPage = () => {
  const [loginPage, setLoginPage] = useState<boolean>(true);

  return (
    <SignupWrapper>
      <AuthTitle loginPage={loginPage} />
      <AuthForm loginPage={loginPage} setLoginPage={setLoginPage} />
    </SignupWrapper>
  );
};

const SignupWrapper = styled.div`
  width: 800px;
  margin: 200px auto;
`;

export default AuthPage;
