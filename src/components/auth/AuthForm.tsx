import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useHttp from '../../hooks/use-http';

import { AuthFormTypes, AuthValidTypes } from '../../types/auth-types';
import { TokenTypes } from '../../types/http-types';

import Button from '../UI/Button';
import AuthEmail from './AuthEmail';
import AuthPassword from './AuthPassword';

const AuthForm = ({ loginPage, setLoginPage }: AuthFormTypes) => {
  const [isValid, setIsValid] = useState<AuthValidTypes>({
    email: false,
    password: false,
  });
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const sendRequest = useHttp();

  const switchLoginHandler = () => setLoginPage(false);

  const successHandler = (data: TokenTypes) => {
    if (loginPage) {
      localStorage.setItem('token', data.access_token);
      navigate('/todo');
    } else {
      alert('회원가입 되었습니다.');
      setLoginPage(true);
    }
  };

  useEffect(() => {
    const isValidForm = Object.values(isValid).every(valid => valid === true);

    setFormIsValid(isValidForm);
  }, [isValid]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendRequest(
      {
        url: loginPage ? '/auth/signin' : '/auth/signup',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          email: emailInputRef.current?.value,
          password: passwordInputRef.current?.value,
        },
      },
      successHandler,
    );
  };

  return (
    <>
      <FormWrapper onSubmit={submitHandler}>
        <AuthEmail emailRef={emailInputRef} setIsValid={setIsValid} />
        <AuthPassword passwordRef={passwordInputRef} setIsValid={setIsValid} />
        <ButtonWrapper>
          <LoginButton disabled={!formIsValid}>
            {loginPage ? '로그인' : '가입완료'}
          </LoginButton>
        </ButtonWrapper>
      </FormWrapper>
      {loginPage && (
        <ButtonWrapper>
          <SignupButton onClick={switchLoginHandler}>회원가입</SignupButton>
        </ButtonWrapper>
      )}
    </>
  );
};

const FormWrapper = styled.form`
  font-size: 20px;
`;

const ButtonWrapper = styled.div`
  width: 300px;
  margin: 0 auto;

  button {
    width: 100%;
    font-size: 20px;
    height: 70px;
    border-radius: 5px;
    border: none;
  }
`;

const LoginButton = styled(Button)`
  background-color: lightsalmon;
  margin-bottom: 20px;
`;

const SignupButton = styled(Button)`
  width: 100%;
  font-size: 20px;
  height: 70px;
  border-radius: 5px;
  background-color: beige;
  border: none;
`;
export default AuthForm;
