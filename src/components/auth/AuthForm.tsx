import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useHttp from '../../hooks/use-http';

import { AuthFormTypes } from '../../types/auth-types';
import { TokenTypes } from '../../types/http-types';

import Button from '../UI/Button';
import Input from '../UI/Input';

const AuthForm = ({ loginPage, setLoginPage }: AuthFormTypes) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const navigate = useNavigate();
  const sendRequest = useHttp();

  useEffect(() => {
    if (email.includes('@') && password.length >= 8) setIsValid(true);
    else setIsValid(false);
  }, [email, password]);

  const switchLoginHandler = () => {
    setLoginPage(false);
    setEmail('');
    setPassword('');
  };

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const successHandler = (data: TokenTypes) => {
    if (loginPage) {
      localStorage.setItem('token', data.access_token);
      navigate('/todo');
    } else {
      alert('회원가입 되었습니다.');
      setLoginPage(true);
    }

    setEmail('');
    setPassword('');
  };

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
          email: email,
          password: password,
        },
      },
      successHandler,
    );
  };

  return (
    <>
      <FormWrapper onSubmit={submitHandler}>
        <InputWrapper>
          <label htmlFor="email">이메일</label>
          <Input
            type="email"
            placeholder="이메일 형식을 지켜주세요."
            id="email"
            onChange={emailChangeHandler}
            value={email}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="password">비밀번호</label>
          <Input
            type="password"
            placeholder="비민번호는 8자리 이상이어야 합니다."
            id="password"
            value={password}
            onChange={passwordChangeHandler}
          />
        </InputWrapper>
        <ButtonWrapper>
          <LoginButton disabled={!isValid}>
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

const InputWrapper = styled.div`
  width: 500px;
  margin: 40px auto;
  text-align: center;

  label {
    display: inline-block;
    width: 100px;
    margin-right: 10px;
  }

  input {
    width: 300px;
    height: 50px;
    padding: 10px;
  }
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
